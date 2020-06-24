import React from "react";
import { Link } from "react-router-dom";

import classes from "./DropDownItem.module.css";

const DropDownItem = (props) => {
  /*
  Recives:
  -to
  -props.children
  */
  const { to } = props;
  return (
    <Link to={to.toLowerCase().replace(" ", "-")} className={classes.MenuItem}>
      {props.children}
    </Link>
  );
};

export default DropDownItem;
