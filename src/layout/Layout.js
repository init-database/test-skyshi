import { Fragment } from "react";
import HeaderBackground from "../components/HeaderBackground";

const Layout = (props) => {
  return (
    <Fragment>
      <HeaderBackground /> {props.children}
    </Fragment>
  );
};

export default Layout;
