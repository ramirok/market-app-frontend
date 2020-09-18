import React from "react";

import { useUser } from "../../context/userContext";
import Logo from "../../component/Logo/Logo";
import SearchBar from "../../component/SearchBar/SearchBar";
import ShoppingCart from "../../component/ShoppingCart/ShoppingCart";
import MyAccount from "../../component/MyAccount/MyAccount";
import Login from "../../component/Login/Login";
import SignUp from "../../component/SignUp/SignUp";
import classes from "./Header.module.css";

const Header = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  return (
    <div className={classes.HeaderContainer}>
      <Logo />
      <SearchBar />
      {loginData.token ? (
        <>
          {/* if user is loggedIn */}
          <MyAccount />
          <ShoppingCart />
        </>
      ) : (
        <>
          {/* if user isn't loggedIn */}
          <Login /> <SignUp />
        </>
      )}
    </div>
  );
};

export default Header;
