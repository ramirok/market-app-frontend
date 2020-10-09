import React from "react";
import { Link } from "react-router-dom";

import classes from "./DropDownItemLink.module.css";

const DropDownItemLink = (props) => {
  /*
  Recives:
  -to: link path
  -name: item name
  -img: SVG image
  -onClick: onClick handler
  */
  const { to, name, img, onClick } = props;

  return (
    <Link
      to={to.toLowerCase().replace(" ", "-")}
      className={classes.MenuItem}
      onClick={onClick}
    >
      <span>{name}</span>
      <span>{img}</span>
    </Link>
  );
};

export default DropDownItemLink;
