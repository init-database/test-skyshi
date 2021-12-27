import { useEffect, useRef, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import OvalActionButton from "../OvalActionButton/OvalActionButton";
import classes from "./ModalAddItem.module.css";

const labelColorMap = {
  "very-high": "Very High",
  high: "High",
  normal: "Medium",
  low: "Low",
  "very-low": "Very Low",
};

const ModalAddItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isSaveAllowed, setIsSaveAllowed] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState({
    label: "Pilih priority",
    color: "",
  });

  const todoNameInput = useRef();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if (todoNameInput.current) {
      todoNameInput.current.focus();
    }
  });

  useEffect(() => {
    if (props.show) {
      if (!props.isNewRecord) {
        setNewTitle(props.todoListData.title);
        setSelectedPriority({
          label: labelColorMap[props.todoListData.priority],
          color: props.todoListData.priority,
        });
      }
    } else {
      setNewTitle("");
    }
  }, [props.show]);

  useEffect(() => {
    if (!newTitle.trim()) {
      setIsSaveAllowed(true);
    } else {
      setIsSaveAllowed(false);
    }
  }, [newTitle]);

  const handleClose = () => {
    props.setShowModal(false);
  };

  const resetAll = () => {
    setIsLoading(false);
    setNewTitle("");
  };

  const handleSave = () => {
    if (newTitle.trim()) {
      setIsLoading(true);
      props.actionHandler(
        {
          newTitle,
          priority: selectedPriority.color,
        },
        resetAll
      );
    }
  };

  const onKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  // nama list item
  const onChangeHandler = (event) => {
    setNewTitle(event.currentTarget.value);
  };

  // priority
  const changePriorityHandler = (eventKey, event) => {
    const [label, color] = eventKey.split("/");
    setSelectedPriority({
      label: label,
      color: color,
    });
  };

  return (
    <Modal show={props.show} onHide={handleClose} size="lg" data-cy="modal-add" centered>
      <Modal.Header className={classes["p-24-30"]}>
        <Modal.Title>
          <h4 className={classes["modal-title"]} data-cy="modal-add-title">
            {props.modalTitle}
          </h4>
        </Modal.Title>
        <button
          data-cy="modal-add-close-button"
          type="button"
          aria-label="Close"
          className={"btn-close " + classes["btn-close-modal"]}
          onClick={handleClose}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className={classes["field-wrapper"]}>
          <div
            data-cy="modal-add-name-input"
            className={classes["label-field-wrapper"]}
          >
            <label
              data-cy="modal-add-name-title"
              className={classes["field-label"]}
            >
              NAMA LIST ITEM
            </label>
            <input
              ref={todoNameInput}
              data-cy="modal-add-name-input"
              placeholder="Tambahkan nama list item"
              className={"form-control " + classes["item-name-field"]}
              value={newTitle}
              onChange={onChangeHandler}
              onKeyDown={onKeyDownHandler}
            />
          </div>
          <div>
            <label
              data-cy="modal-add-priority-title"
              className={classes["field-label"]}
            >
              PRIORITY
            </label>

            <Dropdown
              onSelect={changePriorityHandler}
            >
              <Dropdown.Toggle variant="" className={classes["unyu"]} data-cy="modal-add-priority-dropdown">
                {!selectedPriority.label.includes("Pilih") && (
                  <span
                    className={
                      classes["label-indicator"] +
                      " " +
                      classes[selectedPriority.color]
                    }
                  ></span>
                )}

                {selectedPriority.label}
              </Dropdown.Toggle>

              <Dropdown.Menu className={classes["inline-width"]}>
                <Dropdown.Item
                  eventKey="Very High/very-high"
                  data-cy="modal-add-priority-item"
                >
                  <span
                    className={
                      classes["label-indicator"] + " " + classes["very-high"]
                    }
                  ></span>
                  Very High
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="High/high"
                  data-cy="modal-add-priority-item"
                >
                  <span
                    className={
                      classes["label-indicator"] + " " + classes["high"]
                    }
                  ></span>
                  High
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="Medium/normal"
                  data-cy="modal-add-priority-item"
                >
                  <span
                    className={
                      classes["label-indicator"] + " " + classes["normal"]
                    }
                  ></span>
                  Medium
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="Low/low"
                  data-cy="modal-add-priority-item"
                >
                  <span
                    className={
                      classes["label-indicator"] + " " + classes["low"]
                    }
                  ></span>
                  Low
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  eventKey="Very Low/very-low"
                  data-cy="modal-add-priority-item"
                >
                  <span
                    className={
                      classes["label-indicator"] + " " + classes["very-low"]
                    }
                  ></span>
                  Very Low
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={classes["p-24-30"]}>
        <OvalActionButton
          text="Simpan"
          btnType="primary"
          withIcon={false}
          actionHandler={handleSave}
          dataCy="modal-add-save-button"
          isLoading={isLoading}
          disabled={isSaveAllowed}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddItem;
