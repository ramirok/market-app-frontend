import React, { useState } from "react";

import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./ShoppingCart.module.css";
import { ReactComponent as Shopping } from "../../assets/shopping-cart.svg";

const ShoppingCart = () => {
  const [visible, setVisible] = useState(false);
  const [mustClear, setMustClear] = useState(false);
  return (
    <span className={classes.Cart}>
      <Shopping
        style={{ height: "3rem", width: "3rem" }}
        onMouseEnter={() => {
          setMustClear(false);
          setVisible(true);
        }}
        onMouseLeave={() => {
          setMustClear(true);
        }}
      />

      <DropDownMenu
        list={["Items", "Items2", "Items3", "View Shopping Cart"]}
        styleCustom={{ right: "-3rem" }}
        visible={visible}
        mustClear={mustClear}
        setMustClear={setMustClear}
        setVisible={setVisible}
      />
    </span>
  );
};

export default ShoppingCart;
