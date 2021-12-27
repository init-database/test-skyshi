import { useEffect, useState } from "react";
import { ReactComponent as PencilIcon } from "../ActivityHeader/pencil-icon.svg";
import { ReactComponent as IconTrashCan } from "../CardGroup/activity-item-delete-button.svg";
import classes from "./CardList.module.css";

const CardList = (props) => {
  const [title, setTitle] = useState(props.data.title);
  const [checkboxState, setCheckboxState] = useState(!props.data.is_active);
  const [priority, setPriority] = useState(props.data.priority);

  useEffect(() => {
    setTitle(props.data.title);
  }, [props.data.title]);

  useEffect(() => {
    setCheckboxState(!props.data.is_active);
  }, [props.data.is_active]);

  useEffect(() => {
    setPriority(props.data.priority);
  }, [props.data.priority]);

  const editItemTodoTitleHandler = () => {
    props.setTodoListData(props.data);
    props.setIsNewRecord(false);
    props.setTitleModalAddItem("Edit Item");
    props.setShowModalAddItem(true);
  };

  const confirmationHandler = (event) => {
    props.setShowModal(true);
    props.setTodoListData(props.data);
  };

  const onChangeCheckboxHandler = () => {
    fetch("https://todo.api.devcode.gethired.id/todo-items/" + props.data.id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_active: !checkboxState ? 0 : 1,
        priority: priority,
        _comment:
          "list of priority is : very-high, high, normal, low, very-low",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          props.setToastText("Update berhasil");
          props.setShowToast(true);
          setCheckboxState((prevState) => !prevState);
        }
      })
      .catch((err) => {
        props.setToastText(err.message);
        props.setShowToast(true);
        console.log(err.message);
      });
  }

  return (
    <div data-cy="todo-item" className={classes["card-list"]}>
      <div data-cy="todo-item-checkbox" onClick={onChangeCheckboxHandler}>
        <input
          type="checkbox"
          data-id={props.data.id}
          className={classes["checkbox-todo-list"]}
          // onChange={checkHandler}
          checked={checkboxState}
        />
      </div>
      <div
        data-cy="todo-item-priority-indicator"
        className={classes["label-indicator"] + " " + classes[priority]}
      ></div>

      <h5
        data-cy="todo-item-title"
        className={classes["todo-item-title"] + " " + classes[!checkboxState]}
      >
        {title}
      </h5>

      <button
        data-cy="todo-item-edit-button"
        className={classes["edit-button"]}
        onClick={editItemTodoTitleHandler}
      >
        <PencilIcon width={15} height={15} fillOpacity={0.5} />
      </button>

      <button
        data-cy="todo-item-delete-button"
        className={classes["delete-button"]}
        onClick={confirmationHandler}
      >
        <IconTrashCan />
      </button>
    </div>
  );
};

export default CardList;
