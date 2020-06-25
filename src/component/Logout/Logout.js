import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../store/actions/auth";
import { deleteAll } from "../../store/actions/cart";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    dispatch(deleteAll());
    window.localStorage.clear();
  }, [dispatch]);
  return <Redirect from="/login" to="/" />;
};

export default Logout;
