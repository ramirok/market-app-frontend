import React from "react";

import Item from "./Items/Item";
import classes from "./NavBar.module.css";

// SVG imports
import { ReactComponent as Vegetables } from "../../assets/categories/vegetables.svg";
import { ReactComponent as Fruits } from "../../assets/categories/fruits.svg";
import { ReactComponent as Spices } from "../../assets/categories/spices.svg";
import { ReactComponent as Snacks } from "../../assets/categories/snacks.svg";
import { ReactComponent as Canned } from "../../assets/categories/canned.svg";

const NavBar = () => {
  // DropDownMenu list items
  const svgStyle = { height: "2rem", width: "2rem" };
  const list = {
    Vegetables: <Vegetables style={svgStyle} />,
    Fruits: <Fruits style={svgStyle} />,
    Spices: <Spices style={svgStyle} />,
    Snacks: <Snacks style={svgStyle} />,
    "Canned products": <Canned style={svgStyle} />,
  };

  return (
    <nav className={classes.NavBar}>
      <ul className={classes.List}>
        <Item item={"Categories"} dropDownMenu={list} />
        <Item item="Deals" />
        <Item item="History" />
        <Item item="Help" />
      </ul>
    </nav>
  );
};

export default NavBar;
