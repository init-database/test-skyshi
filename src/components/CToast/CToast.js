import { Toast, ToastContainer } from "react-bootstrap";
import { ReactComponent as CToastInfoIcon } from "./modal-information-icon.svg";

import "./CToast.css";

const CToast = ({showToast, setShowToast, text}) => {
  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast
        show={showToast}
        autohide
        delay={5000}
        onClose={() => setShowToast(false)}
      >
        <Toast.Body>
          <span data-cy="modal-information-icon" className="pr-10">
            <CToastInfoIcon />
          </span>
          <span data-cy="modal-information-title">{text}</span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CToast;
