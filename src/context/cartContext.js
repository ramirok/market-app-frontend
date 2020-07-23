import React, { useMemo, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { postCart, getCart, delCart } from "../utils/fetchServices";

const CartContext = React.createContext();

export const CartProvider = (props) => {
  const history = useHistory();

  // Cart items
  const [cartItems, setCartItems] = useState([]);

  // fetch cart
  const getAllCart = useCallback(async (token) => {
    const response = await getCart(token);
    setCartItems(response);
  }, []);

  // Post new item to cart
  const addProductHandler = useCallback(
    async (id, quantity, token) => {
      if (token) {
        const response = await postCart({ id, quantity }, token);
        setCartItems(response);
        return true;
      } else {
        history.push("/auth/login");
        return false;
      }
    },
    [history]
  );

  // Delete item from cart
  const delProductHandler = async (id, token) => {
    const response = await delCart(id, token);

    setCartItems(response);
  };

  // return cart items and methods
  const value = useMemo(() => {
    return { cartItems, addProductHandler, delProductHandler, getAllCart };
  }, [cartItems, addProductHandler, getAllCart]);

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export const useCart = () => {
  // customHook to use cart context
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useUser must be used within CartContext");
  }
  return context;
};
