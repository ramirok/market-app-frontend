import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useCart } from "../../context/cartContext";
import CartCard from "../../component/UI/Card/CartCard/CartCard";
import Button from "../../component/Button/Button";
import Spinner from "../../component/UI/Spinner/Spinner";
import classes from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  // customHook for cart context
  // cartItems = [array of items]
  // addProductHandler: add to cart
  // delProductHandler: remove from cart
  const { cartItems, loaded, addProductHandler, delProductHandler } = useCart();

  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    // if cart has loaded
    if (loaded) {
      // if has items, set price
      if (cartItems.length > 0) {
        setTotalPrice(
          cartItems
            .map((el) => el.price * el.quantity)
            .reduce((acc, cur) => acc + cur)
        );
        setLoading(false);

        // if it has no items, set price = null
      } else {
        setTotalPrice(null);
        setLoading(false);
      }
    }
  }, [cartItems, loaded]);

  const history = useHistory();
  return (
    <>
      <div className={classes.Head}></div>

      <div className={classes.Container}>
        {/* shows spinner when loading */}
        {loading ? (
          <div className={classes.SpinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            {/* cart products */}
            {cartItems.map((el) => (
              <CartCard
                key={el.name}
                {...el}
                addProductHandler={addProductHandler}
                delProductHandler={delProductHandler}
              />
            ))}

            {/* total price */}
            {totalPrice ? (
              <div className={classes.TotalPriceContainer}>
                <p>Total</p>
                <p className={classes.Price}>{`$ ${totalPrice.toFixed(2)}`}</p>
                <Button
                  classFromProps={classes.ButtonCheckout}
                  onClick={() => history.push("/app/checkout")}
                >
                  Proced to checkout
                </Button>
              </div>
            ) : (
              // if the are no items in the cart
              <div className={classes.EmptyCart}>
                <p>Your cart is empty</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
