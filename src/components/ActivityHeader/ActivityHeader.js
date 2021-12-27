import { Fragment, useEffect, useRef, useState } from "react";
import OvalActionButton from "../OvalActionButton/OvalActionButton";
import SortList from "../SortList/SortList";
import { ReactComponent as ChevronLeft } from "./chevron-left.svg";
import { ReactComponent as PencilIcon } from "./pencil-icon.svg";

import classes from "./ActivityHeader.module.css";
import { Link } from "react-router-dom";

const ActivityHeader = (props) => {
  const [showUpdateField, setShowUpdateField] = useState(false);
  const [updateFieldText, setUpdateFieldText] = useState(props.title);

  const updateField = useRef(null);

  useEffect(() => {
    setUpdateFieldText(props.title);
  }, [props.title]);

  useEffect(() => {
    if (showUpdateField) {
      updateField.current.focus();
    }
  }, [showUpdateField]);

  const editTitleHandler = () => {
    setShowUpdateField(true);
  };

  const updateFieldChangeHandler = (event) => {
    setUpdateFieldText(event.currentTarget.value);
  };

  const onBlurHandler = () => {
    const trimmedTitle = updateFieldText.trim();
    if (trimmedTitle) {
      fetch(
        "https://todo.api.devcode.gethired.id/activity-groups/" +
          props.groupData.id,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: trimmedTitle,
          }),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.id) {
            setUpdateFieldText(data.title);
            props.setToastText("Update title berhasil");
            props.setShowToast(true);
          }
        })
        .catch((err) => {
          props.setToastText(err.message);
          props.setShowToast(true);
          console.log(err.message);
        });
      setShowUpdateField(false);
    }
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      onBlurHandler();
    }
  };

  return (
    <Fragment>
      <div
        className={"row d-flex justify-content-between " + classes["todo-header"]}
      >
        <div className={"col-sm-6 " + classes["action-title-wrapper"]}>
          {props.withBackLink && (
            <Link
              to="/"
              className={classes["back-link"]}
              data-cy="todo-back-button"
            >
              <ChevronLeft />
            </Link>
          )}

          {showUpdateField ? (
            <input
              ref={updateField}
              type="text"
              name="update-group-title"
              className={classes["update-group-title"]}
              value={updateFieldText}
              onChange={updateFieldChangeHandler}
              onKeyDown={keyDownHandler}
              onBlur={onBlurHandler}
            />
          ) : (
            <h1
              data-cy={props.dataCyTitle}
              className={classes["activity-title"]}
              onClick={editTitleHandler}
            >
              {updateFieldText ? updateFieldText : "Activity"}
            </h1>
          )}

          {props.editableTitle && (
            <button
              data-cy="todo-title-edit-button"
              className={classes["edit-button"]}
              onClick={editTitleHandler}
            >
              <PencilIcon />
            </button>
          )}
        </div>

        <div className="col-sm-6 text-end">
          {props.editableTitle && <SortList sortTodoListHanlder={props.sortTodoListHanlder} />}
          <OvalActionButton
            actionHandler={props.addHandler}
            text="Tambah"
            btnType="primary"
            isLoading={props.isLoading}
            dataCy={props.dataCyOvalButton}
            setIsNewRecord={props.setIsNewRecord}
            withIcon
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ActivityHeader;
