import React from "react";

import classes from "./DropDownItem.module.css";

const DropDownItem = (props) => {
  return (
    <span
      className={classes.MenuItem}
      onClick={() => props.goToMenu && props.changeState(props.goToMenu)}
    >
      {props.children}
    </span>
  );
};

export default DropDownItem;
