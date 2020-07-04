import React from "react";
import { Link } from "react-router-dom";

import classes from "./DropDownItemLink.module.css";

const DropDownItemLink = (props) => {
  /*
  Recives:
  -to: link path
  -name: item name
  -img: SVG image
  */
  const { to, name, img } = props;
  return (
    <Link to={to.toLowerCase().replace(" ", "-")} className={classes.MenuItem}>
      <span>{name}</span>
      <span>{img}</span>
    </Link>
  );
};

export default DropDownItemLink;
