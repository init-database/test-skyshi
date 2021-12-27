import classes from "./HeaderBackground.module.css";

const HeaderBackground = () => {
  return (
    <div data-cy="header-background" className={'d-flex align-items-center ' + classes["header-background"]}>
      <div className="container">
        <h2 data-cy="header-title" className={classes["header-title"]}>
          TO DO LIST APP
        </h2>
      </div>
    </div>
  );
};

export default HeaderBackground;
