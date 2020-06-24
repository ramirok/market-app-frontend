import React from "react";
import { useSelector } from "react-redux";

import Button from "../../component/Button/Button";
import Logo from "../../component/Logo/Logo";
import NavBar from "../../component/NavBar/NavBar";
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
      <div className={classes.SearchBarContainer}>
        <input type="text" className={classes.SearchBar} />
        <Button text="Search" classFromProps={classes.Button} />
        <NavBar />
      </div>
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
