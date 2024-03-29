import React, { useMemo, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { fetchService } from "../utils/fetchServices";

const CartContext = React.createContext();

export const CartProvider = (props) => {
  const history = useHistory();

  // cart items
  const [cartItems, setCartItems] = useState([]);

  // cart loaded first time, used for spinner in /app/cart
  const [loaded, setLoaded] = useState(false);

  // fetch cart
  const getAllCart = useCallback(async (token) => {
    const response = await fetchService({
      method: "get",
      url: "cart",
      token,
    });

    setCartItems(response.products);
    setLoaded(true);
  }, []);

  // Post new item to cart
  const addProductHandler = useCallback(
    async (id, quantity, token) => {
      if (token) {
        const response = await fetchService({
          method: "post",
          url: `cart/${id}`,
          token,
          body: { quantity },
        });
        setCartItems(response.products);
        return true;
      } else {
        history.push("/auth/login");
        return false;
      }
    },
    [history]
  );

  // Delete item from cart
  const delProductHandler = useCallback(
    async (id, token) => {
      const response = await fetchService({
        method: "delete",
        url: `cart/${id}`,
        token,
      });
      if (response.ok) {
        setCartItems(response.products);
      } else {
        getAllCart(token);
      }
    },
    [getAllCart]
  );

  // reset cart after purchase
  const resetCart = async (token, data) => {
    const response = await fetchService({
      method: "post",
      url: "users/reset-cart",
      token,
      body: { orderId: data },
    });
    if (response.ok) {
      setCartItems(response);
      return true;
    } else {
      return false;
    }
  };

  // return cart items and methods
  const value = useMemo(() => {
    return {
      cartItems,
      loaded,
      addProductHandler,
      delProductHandler,
      getAllCart,
      resetCart,
    };
  }, [cartItems, loaded, addProductHandler, getAllCart, delProductHandler]);

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
