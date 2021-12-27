import { Link } from "react-router-dom";
import { ReactComponent as IconTrashCan } from "./activity-item-delete-button.svg";
import classes from "./CardGroup.module.css";

const CardGroup = (props) => {
  const date = new Date(props.data.created_at);
  const createdAt = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const confirmationHandler = (event) => {
    props.setShowModal(true);
    props.setGroupData(props.data);
  };

  return (
    <div className={classes["activity-card"]} data-cy="activity-item">
      <Link
        to={"detail/" + props.data.id}
        className={classes["navigation-link"]}
        data-cy="activity-item-title"
      >
          <h4
            className={classes["activity-item-title"]}
          >
            {props.data.title}
          </h4>
      </Link>

      <div className={classes["card-footer"]}>
        <span
          data-cy="activity-item-date"
          className={classes["activity-item-date"]}
        >
          {createdAt}
        </span>
        <button
          data-cy="activity-item-delete-button"
          className={classes["activity-item-delete-button"]}
          onClick={confirmationHandler}
        >
          <IconTrashCan />
        </button>
      </div>
    </div>
  );
};

export default CardGroup;
