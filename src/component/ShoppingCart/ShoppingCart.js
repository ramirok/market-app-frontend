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

  let items;

  if (cartItems.length >= 1 && cartItems.length < 7) {
    items = cartItems.map((el) => (
      <DropDownItemDiv
        key={el.name}
        name={el.name}
        amount={el.amount}
        onClick={() =>
          dispatch({
            type: "SHOW",
            img: el.img,
            name: el.name,
            price: el.price,
            description: el.description,
          })
        }
      />
    ));
    items.push(<DropDownItemLink to="cart" name="View cart" key="cart" />);
  } else if (cartItems.length >= 7) {
    items = cartItems
      .slice(0, 6)
      .map((el) => (
        <DropDownItemDiv key={el.name} name={el.name} amount={el.amount} />
      ));
    items.push(
      <div className={classes.MenuItem} key="cart">
        View cart
        <span className={classes.Number}>{`+${cartItems.length - 6}`}</span>
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
