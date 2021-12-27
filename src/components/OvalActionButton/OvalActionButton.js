import { Spinner } from "react-bootstrap";
import { ReactComponent as IconPlus } from "./icon-plus.svg";
import classes from "./OvalActionButton.module.css";

const OvalActionButton = (props) => {
  const clickHandler = () => {
    if (props.setIsNewRecord) {
      props.setIsNewRecord(true);
    }
    props.actionHandler();
  };

  return (
    <button
      data-cy={props.dataCy}
      className={`btn btn-${props.btnType} ` + classes["btn-oval"]}
      onClick={clickHandler}
      disabled={props.disabled}
    >
      {props.isLoading && (
        <div
          className={
            classes["spinner-background"] + " " + classes[props.btnType]
          }
        >
          <Spinner
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
          />
        </div>
      )}

      {props.withIcon && (
        <span className={classes["mr-14"]}>
          <IconPlus />
        </span>
      )}
      <span className={classes["btn-oval-text"]}>{props.text}</span>
    </button>
  );
};

export default OvalActionButton;
