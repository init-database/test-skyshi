import { Dropdown } from "react-bootstrap";
import { ReactComponent as SortListIcon } from "./sort-list-icon.svg";
import { ReactComponent as NewestIcon } from "./newest.svg";
import { ReactComponent as OldestIcon } from "./oldest.svg";
import { ReactComponent as AZIcon } from "./a-z.svg";
import { ReactComponent as ZAIcon } from "./z-a.svg";
import { ReactComponent as NotDoneIcon } from "./not-done.svg";
import { ReactComponent as ChecklistIcon } from "./checklist.svg";

import classes from "./SortList.module.css";
import { useState } from "react";

const indexSortNameMap = ["newest", "oldest", "a-z", "z-a", "not-done"];

const SortList = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const changeSortHandler = (eventKey, event) => {
    setSelectedIndex(+eventKey);
    props.sortTodoListHanlder(indexSortNameMap[+eventKey]);
  };

  return (
    <Dropdown onSelect={changeSortHandler} className="d-inline-block">
      <Dropdown.Toggle
        variant=""
        className={classes["button-sort"]}
        data-cy="todo-sort-button"
      >
        <SortListIcon />
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes["menu-list"]}>
        <Dropdown.Item
          eventKey="0"
          data-cy="sort-section"
          className={classes["sort-mode-item"]}
        >
          <NewestIcon data-cy="sort-selection-icon" />
          <span data-cy="sort-selection-title" className={classes["label-sort"]}>Terbaru</span>
          {selectedIndex === 0 && <ChecklistIcon data-cy="sort-selection-selected" />}
        </Dropdown.Item>
        <Dropdown.Divider className={classes["no-margin"]} />
        <Dropdown.Item
          eventKey="1"
          data-cy="sort-section"
          className={classes["sort-mode-item"]}
        >
          <OldestIcon data-cy="sort-selection-icon" />
          <span data-cy="sort-selection-title" className={classes["label-sort"]}>Terlama</span>
          {selectedIndex === 1 && <ChecklistIcon data-cy="sort-selection-selected" />}
        </Dropdown.Item>
        <Dropdown.Divider className={classes["no-margin"]} />
        <Dropdown.Item
          eventKey="2"
          data-cy="sort-section"
          className={classes["sort-mode-item"]}
        >
          <AZIcon data-cy="sort-selection-icon" />
          <span data-cy="sort-selection-title" className={classes["label-sort"]}>A-Z</span>
          {selectedIndex === 2 && <ChecklistIcon data-cy="sort-selection-selected" />}
        </Dropdown.Item>
        <Dropdown.Divider className={classes["no-margin"]} />
        <Dropdown.Item
          eventKey="3"
          data-cy="sort-section"
          className={classes["sort-mode-item"]}
        >
          <ZAIcon data-cy="sort-selection-icon" />
          <span data-cy="sort-selection-title" className={classes["label-sort"]}>Z-A</span>
          {selectedIndex === 3 && <ChecklistIcon data-cy="sort-selection-selected" />}
        </Dropdown.Item>
        <Dropdown.Divider className={classes["no-margin"]} />
        <Dropdown.Item
          eventKey="4"
          data-cy="sort-section"
          className={classes["sort-mode-item"]}
        >
          <NotDoneIcon data-cy="sort-selection-icon" />
          <span data-cy="sort-selection-title" className={classes["label-sort"]}>Belum selesai</span>
          {selectedIndex === 4 && <ChecklistIcon data-cy="sort-selection-selected" />}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortList;
