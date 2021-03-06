import React, { useState, useEffect } from "react";

import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import DropDownItemDiv from "../UI/DropDownMenu/DropDownItemDiv/DropDownItemDiv";
import DropDownItemLink from "../UI/DropDownMenu/DropDownItemLink/DropDownItemLink";
import ProductModal from "../UI/Modal/ProductModal/ProductModal";
import classes from "./ShoppingCart.module.css";

// SVG imports
import { ReactComponent as Shopping } from "../../assets/shopping-cart.svg";

const ShoppingCart = () => {
  //toggles dropDownMenu visibility onClick and onLeave
  const [visible, setVisible] = useState(false);

  // toggles modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // product data for modal
  const [modalData, setModalData] = useState({});

  // customHook for user context:
  // loginData = {name, email, token}
  const { loginData } = useUser();

  // customHook for cart context
  // cartItems = [array of items]
  // getAllCart: fetches usser's cart
  const { cartItems, getAllCart } = useCart();

  useEffect(() => {
    // fetch user's cart on first render
    getAllCart(loginData.token);
  }, [loginData.token, getAllCart]);

  // list of items to show in shopping cart dropDownMenu
  let items;

  if (cartItems.length >= 1 && cartItems.length < 7) {
    // between 1 -7 items: shows them all
    items = cartItems.map((el) => (
      <DropDownItemDiv
        key={el.name}
        name={el.name}
        amount={el.quantity}
        id={el.id}
        onClick={() => {
          setModalData(el);
          setIsOpen(true);
        }}
      />
    ));
    // view Cart link
    items.push(<DropDownItemLink to="/app/cart" name="View cart" key="cart" />);
  } else if (cartItems.length >= 7) {
    // more than 7 items: shows 6 and "View cart +n"
    items = cartItems.slice(0, 6).map((el) => (
      <DropDownItemDiv
        key={el.name}
        name={el.name}
        amount={el.quantity}
        id={el.id}
        onClick={() => {
          setModalData(el);
          setIsOpen(true);
        }}
      />
    ));
    // view cart link
    items.push(
      <div className={classes.MenuItem} key="cart">
        <DropDownItemLink to="/app/cart" name="View cart" />
        <span className={classes.Number}>{`+${cartItems.length - 6}`}</span>
      </div>
    );
  } else {
    // 0 items: shows "empty cart"
    items = <span className={classes.MenuItemNoHover}>Cart is empty</span>;
  }

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <ProductModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalData={modalData}
        />
      )}

      <div
        className={classes.CartContainer}
        onMouseLeave={() => {
          setVisible(false);
        }}
      >
        {/* if cart has items, show item count icon (yellow circle) */}
        {cartItems.length > 0 ? (
          <span className={classes.ItemCount}>{cartItems.length}</span>
        ) : null}

        {/* SVG icon */}
        <Shopping
          className={classes.Bag}
          onClick={() => {
            setVisible(!visible);
          }}
        />

        {/* dropDownMenu links */}
        <DropDownMenu visible={visible} setVisible={setVisible}>
          {items}
        </DropDownMenu>
      </div>
    </>
  );
};

export default ShoppingCart;
