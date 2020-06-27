import React from "react";
import { useSelector } from "react-redux";

import Logo from "../../component/Logo/Logo";
import SearchBar from "../../component/SearchBar/SearchBar";
import classes from "./Header.module.css";
import ShoppingCart from "../../component/ShoppingCart/ShoppingCart";
import MyAccount from "../../component/MyAccount/MyAccount";
import Login from "../../component/Login/Login";
import SignUp from "../../component/SignUp/SignUp";

const Header = () => {
  const isLogged = useSelector((state) => state.auth);

  return (
    <div className={classes.HeaderContainer}>
      <Logo />
      <SearchBar />
      {isLogged.userId ? (
        <>
          <MyAccount />
          <ShoppingCart />
        </>
      ) : (
        <>
          <Login /> <SignUp />
        </>
      )}
    </div>
  );
};

export default Header;
