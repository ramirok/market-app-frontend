import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./ShoppingCart.module.css";

// SVG imports
import { ReactComponent as Shopping } from "../../assets/shopping-cart.svg";
import DropDownItemDiv from "../UI/DropDownMenu/DropDownItemDiv/DropDownItemDiv";
import DropDownItemLink from "../UI/DropDownMenu/DropDownItemLink/DropDownItemLink";

const ShoppingCart = () => {
  //Toggles dropDownMenu visibility onClick and onLeave
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  const list = { ...cartItems };

  let items;

  if (Object.keys(list).length >= 1 && Object.keys(list).length < 7) {
    items = Object.keys(list).map((el) => (
      <DropDownItemDiv
        key={el}
        to={el}
        name={el}
        amount={list[el]}
        onClick={() => dispatch({ type: "SHOW" })}
      />
    ));
    items.push(<DropDownItemLink to="cart" name="View cart" key="cart" />);
  } else if (Object.keys(list).length >= 7) {
    items = Object.keys(list)
      .slice(0, 6)
      .map((el) => (
        <DropDownItemDiv key={el} to={el} name={el} amount={list[el]} />
      ));
    items.push(
      <div className={classes.MenuItem} key="cart">
        View cart
        <span className={classes.Number}>{`+${
          Object.keys(list).length - 6
        }`}</span>
      </div>
    );
  } else {
    items = <span className={classes.MenuItemNoHover}>Cart is empty</span>;
  }

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
        {items}
      </DropDownMenu>
    </div>
  );
};

export default ShoppingCart;
