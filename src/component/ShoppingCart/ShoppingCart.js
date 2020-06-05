import React, { useState } from "react";

import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./ShoppingCart.module.css";
import { ReactComponent as Shopping } from "../../assets/shopping-cart.svg";

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);

  return (
    <span className={classes.Cart} onMouseEnter={() => setOpen(true)}>
      <Shopping style={{ height: "3rem", width: "3rem" }} />
      {open && (
        <DropDownMenu
          list={["Items", "Items", "Items", "View Shopping Cart"]}
          styleCustom={{ right: "-3rem" }}
          setOpen={setOpen}
        />
      )}
    </span>
  );
};

export default ShoppingCart;
