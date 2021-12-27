import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import OvalActionButton from "../OvalActionButton/OvalActionButton";
import { ReactComponent as IconModalDelete } from "./modal-delete-icon.svg";
import classes from "./ModalConfirm.module.css";

const ModalConfirm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleClose = () => props.setShowModal(false);
  
  const handleDelete = () => {
    setIsLoading(true);
    props.actionHandler(props.groupData.id);
  };

  return (
    <Modal show={props.show} onHide={handleClose} data-cy="modal-delete" centered>
      <Modal.Body>
        <div data-cy="modal-delete-icon">
          <IconModalDelete />
        </div>
        <h5 data-cy="modal-delete-title" className={classes["modal-text"]}>
          <span>Apakah anda yakin menghapus {props.kind}</span>{" "}
          <p className={classes["no-margin"]}><strong>"{props.groupData.title}"?</strong></p>
        </h5>
        <div
          className={
            "d-flex justify-content-evenly " + classes["modal-btn-wrapper"]
          }
        >
          <OvalActionButton
            text="Batal"
            btnType="default"
            withIcon={false}
            actionHandler={handleClose}
            dataCy="modal-delete-cancel-button"
          />
          <OvalActionButton
            text="Hapus"
            btnType="danger"
            withIcon={false}
            actionHandler={handleDelete}
            dataCy="modal-delete-confirm-button"
            isLoading={isLoading}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirm;
