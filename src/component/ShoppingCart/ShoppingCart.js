import React, { useState } from "react";
import { useSelector } from "react-redux";

import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./ShoppingCart.module.css";

// SVG imports
import { ReactComponent as Shopping } from "../../assets/shopping-cart.svg";

const ShoppingCart = () => {
  //Toggles dropDownMenu visibility onClick and onLeave
  const [visible, setVisible] = useState(false);

  const cartItems = useSelector((state) => state.cart);

  const list = { ...cartItems };

  const clicked = () => console.log("removed");

  return (
    <div
      className={classes.CartContainer}
      onClick={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <Shopping className={classes.Bag} />
      <DropDownMenu
        list={list}
        styleCustom={{ right: "2rem" }}
        visible={visible}
        setVisible={setVisible}
        clicked={clicked}
      />
    </div>
  );
};

export default ShoppingCart;
