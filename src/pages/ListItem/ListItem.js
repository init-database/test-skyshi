import { useState, useEffect, Fragment } from "react";
import ActivityHeader from "../../components/ActivityHeader/ActivityHeader";
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import CToast from "../../components/CToast/CToast";
import CardList from "../../components/CardList/CardList";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import todoEmptyStateImage from "./todo-empty-state.png";
import classes from "./ListItem.module.css";
import ModalAddItem from "../../components/ModalAddItem/ModalAddItem";

const ListItem = (props) => {
  const [allTodoList, setAllTodoList] = useState([]); // semua list todo
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAddItem, setShowModalAddItem] = useState(false);
  const [titleModalAddItem, setTitleModalAddItem] =
    useState("Tambah List Item");
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("List berhasil dihapus");
  const [todoListData, setTodoListData] = useState({}); // satuan/item dari todo list diisi untuk keperluan update dan delete
  const [groupData, setGroupData] = useState({});
  const [refresh, setRefresh] = useState(true);
  const { groupId } = useParams();

  useEffect(() => {
    fetch("https://todo.api.devcode.gethired.id/activity-groups/" + groupId)
      .then((res) => res.json())
      .then((data) => {
        setGroupData(data.id ? data : {});
      })
      .catch((err) => {
        setToastText(err.message);
        setShowToast(true);
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (refresh) {
      fetch(
        "https://todo.api.devcode.gethired.id/todo-items?activity_group_id=" +
          groupId
      )
        .then((res) => res.json())
        .then((data) => {
          setRefresh(false);
          setAllTodoList(data.data ? data.data : []);
        })
        .catch((err) => {
          setRefresh(false);
          setToastText(err.message);
          setShowToast(true);
          console.log(err.message);
        });
    }
  }, [refresh]);

  const addTodoListItemHandler = (payload, resetModal) => {
    let itemId = "/" + todoListData.id;
    let method = "PATCH";
    let dataJson = {
      title: payload.newTitle,
      is_active: todoListData.is_active,
      priority: payload.priority,
      _comment: "list of priority is : very-high, high, normal, low, very-low",
    };

    if (isNewRecord) {
      itemId = "";
      method = "POST";
      dataJson = {
        activity_group_id: groupData.id,
        title: payload.newTitle,
        priority: payload.priority,
        _comment:
          "list of priority is : very-high, high, normal, low, very-low | defalut value is very-high",
      };
    }

    fetch("https://todo.api.devcode.gethired.id/todo-items" + itemId, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJson),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllTodoList((prevState) => {
          if (isNewRecord) {
            return [
              {
                id: data.id,
                title: data.title,
                activity_group_id: data.activity_group_id,
                is_active: data.is_active ? 1 : 0,
                priority: data.priority,
              },
              ...prevState,
            ];
          } else {
            let updatedIndex;
            for (let i = 0; i < prevState.length; i++) {
              const obj = prevState[i];
              if (obj.id === data.id) {
                updatedIndex = i;
                break;
              }
            }
            if (typeof updatedIndex === "number") {
              let newList = [...prevState];
              newList.splice(updatedIndex, 1, {
                id: data.id,
                title: data.title,
                activity_group_id: data.activity_group_id,
                is_active: data.is_active ? 1 : 0,
                priority: data.priority,
              });

              return newList;
            }
          }
        });

        resetModal();
        setShowModalAddItem(false);
      })
      .catch((err) => {
        resetModal();
        setShowModalAddItem(false);
        setToastText(err.message);
        setShowToast(true);
        console.log(err.message);
      });
  };

  const deleteTodoListItemHandler = (id) => {
    fetch("https://todo.api.devcode.gethired.id/todo-items/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 1) {
          setShowModal(false);
          setToastText("Item berhasil dihapus");
          setShowToast(true);
          setRefresh(true);
          setTodoListData({});
        }
      })
      .catch((err) => {
        setTodoListData({});
        console.log(err.message);
      });
  };

  const showModalAddItemHandler = () => {
    setTitleModalAddItem("Tambah List Item");
    setShowModalAddItem(true);
  };

  const sortTodoListHanlder = (sort) => {
    let newSortedList = [];
    switch (sort) {
      case "newest":
        newSortedList = allTodoList.slice(0).reverse(function (a, b) {
          return (+a.id) - (+b.id);
        });
        setAllTodoList(newSortedList);
        break;
      case "oldest":
        newSortedList = allTodoList.slice(0).sort(function (a, b) {
          return (+a.id) - (+b.id);
        });
        setAllTodoList(newSortedList);
        break;
      case "a-z":
        newSortedList = allTodoList.slice(0).sort(function (a, b) {
            const lowA = a.title.toLowerCase();
            const lowB = b.title.toLowerCase();
            if (lowA < lowB) {
                return -1;
            } else if (lowA > lowB) {
                return 1;
            } else if (lowA === lowB) {
                return 0;
            }
        });
        setAllTodoList(newSortedList);
        break;
      case "z-a":
        newSortedList = allTodoList.slice(0).sort(function (a, b) {
            const lowA = a.title.toLowerCase();
            const lowB = b.title.toLowerCase();
            if (lowA < lowB) {
                return 1; // harusnya ini return negative tapi karena sort nya z ke a jadi di balik
            } else if (lowA > lowB) {
                return -1; // harusnya ini return positive tapi karena sort nya z ke a jadi di balik
            } else if (lowA === lowB) {
                return 0;
            }
        });
        setAllTodoList(newSortedList);
        break;
      default:
          // urutkan yang belum selesai paling pertama
        newSortedList = allTodoList.slice(0).sort(function (a, b) {
            const numA = +a.is_active;
            const numB = +b.is_active;
            if ((numA - numB) < 0) {
                return 1; // harusnya ini return negative tapi karena tujuan sort nya reverse jadi di balik
            } else if ((numA - numB) > 0) {
                return -1; // harusnya ini return positive tapi karena tujuan sort nya reverse jadi di balik
            } else {
                return 0;
            }
          });
          setAllTodoList(newSortedList);
        break;
    }
  };

  return (
    <div className={"container " + classes["container-todo"]}>
      {refresh ? (
        <div className={classes["spinner-background"]}>
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        </div>
      ) : (
        <Fragment>
          <ModalConfirm
            show={showModal}
            setShowModal={setShowModal}
            actionHandler={deleteTodoListItemHandler}
            groupData={todoListData}
            kind="List Item"
          />

          <ModalAddItem
            show={showModalAddItem}
            setShowModal={setShowModalAddItem}
            actionHandler={addTodoListItemHandler}
            todoListData={todoListData}
            isNewRecord={isNewRecord}
            modalTitle={titleModalAddItem}
          />

          <ActivityHeader
            addHandler={showModalAddItemHandler}
            isLoading={isLoading}
            title={groupData.title}
            dataCyTitle="todo-title"
            dataCyOvalButton="todo-add-button"
            groupData={groupData}
            setToastText={setToastText}
            setShowToast={setShowToast}
            setIsNewRecord={setIsNewRecord}
            sortTodoListHanlder={sortTodoListHanlder}
            withBackLink
            editableTitle
          />
          <div className="row">
            {allTodoList.length ? (
              allTodoList.map((val, idx, arr) => {
                return (
                  <div key={val.id} className="col-sm-12">
                    <CardList
                      data={val}
                      setShowModal={setShowModal}
                      setShowModalAddItem={setShowModalAddItem}
                      setTodoListData={setTodoListData}
                      setToastText={setToastText}
                      setShowToast={setShowToast}
                      setTitleModalAddItem={setTitleModalAddItem}
                      setIsNewRecord={setIsNewRecord}
                    />
                  </div>
                );
              })
            ) : (
              <div data-cy="todo-empty-state" className="text-center">
                <img
                  className={classes["todo-empty-state"]}
                  src={todoEmptyStateImage}
                  alt="todoEmptyStateImage"
                  onClick={() => setShowModalAddItem(true)}
                />
              </div>
            )}
          </div>

          <CToast
            showToast={showToast}
            setShowToast={setShowToast}
            text={toastText}
          />
        </Fragment>
      )}
    </div>
  );
};

export default ListItem;
