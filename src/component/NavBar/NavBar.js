import React, { useState } from "react";

import Item from "./Items/Item";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [mustClear, setMustClear] = useState(false);

  return (
    <nav className={classes.NavBar}>
      <ul className={classes.List}>
        <Item
          item={"Categories"}
          setOpen={setOpen}
          open={open}
          setMustClear={setMustClear}
        >
          <DropDownMenu
            list={[
              "Arts & Craft",
              " Beauty and Personal Care",
              "Electronics",
              "Women's Fashion",
              "Men's Fashion",
              "Toys and Games",
              "Hemo and Kitchen",
            ]}
            setOpen={setOpen}
            open={open}
            mustClear={mustClear}
            setMustClear={setMustClear}
          />
        </Item>
        <Item item="Deals" />
        <Item item="History" />
        <Item item="Help" />
      </ul>
    </nav>
  );
};

export default NavBar;
