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
  // style for svgs
  const svgStyle = { height: "2rem", width: "2rem" };

  // DropDownMenu list items
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
        {/* Only Categories has a dropDownMenu */}
        <Item name={"Categories"} dropDownMenu={list} />
        <Item name="Deals" />
        <Item name="History" />
        <Item name="Help" />
      </ul>
    </nav>
  );
};

export default NavBar;
