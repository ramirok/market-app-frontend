import React from "react";

import { useCart } from "../../context/cartContext";
import ProductCard from "../../component/UI/ShoppingCartCard/ShoppingCartCard";
import Button from "../../component/Button/Button";
import classes from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  // customHook for cart context
  // cartItems = [array of items]
  // addProductHandler: add to cart
  // delProductHandler: remove from cart
  const { cartItems, addProductHandler, delProductHandler } = useCart();

  // total price
  const total =
    cartItems.length > 0
      ? cartItems
          .map((el) => el.price * el.quantity)
          .reduce((acc, cur) => acc + cur)
      : 0;

  return (
    <>
      <div className={classes.Head}></div>

      <div className={classes.Container}>
        {/* cart products */}
        {cartItems.map((el) => (
          <ProductCard
            key={el.name}
            {...el}
            addProductHandler={addProductHandler}
            delProductHandler={delProductHandler}
          />
        ))}

        {/* total price */}
        <div className={classes.Product}>
          <p>Total</p>
          <p className={classes.Price}>{`$ ${total.toFixed(2)}`}</p>
          <Button
            text="Proced to checkout"
            classFromProps={classes.ButtonCheckout}
          />
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
