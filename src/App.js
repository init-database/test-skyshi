import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ListItem from "./pages/ListItem/ListItem";

function App() {
  return (
    <Fragment>
      <Layout />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:groupId" element={<ListItem />} />
      </Routes>
    </Fragment>
  );
}

export default App;
