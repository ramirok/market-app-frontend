import React, { useState } from "react";
import { useSelector } from "react-redux";

import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./ShoppingCart.module.css";

// SVG imports
import { ReactComponent as Shopping } from "../../assets/shopping-cart.svg";
import DropDownItemDiv from "../UI/DropDownMenu/DropDownItemDiv/DropDownItemDiv";

const ShoppingCart = () => {
  //Toggles dropDownMenu visibility onClick and onLeave
  const [visible, setVisible] = useState(false);

  const cartItems = useSelector((state) => state.cart);

  const list = { ...cartItems };

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
        styleCustom={{ right: "2rem" }}
        visible={visible}
        setVisible={setVisible}
      >
        {Object.keys(list).length >= 1 ? (
          Object.keys(list).map((el) => (
            <DropDownItemDiv key={el} to={el} name={el} list={list} />
          ))
        ) : (
          <span className={classes.MenuItem}>Cart is empty</span>
        )}
      </DropDownMenu>
    </div>
  );
};

export default ShoppingCart;
