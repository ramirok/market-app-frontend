import React from "react";

import Button from "../../component/Button/Button";
import NavBar from "../../component/NavBar/NavBar";
import classes from "./Header.module.css";
import ShoppingCart from "../../component/ShoppingCart/ShoppingCart";
import MyAccount from "../../component/MyAccount/MyAccount";

const Header = () => {
  return (
    <>
      <div className={classes.HeaderBack} />
      <div className={classes.SearchBarContainer}>
        <div className={classes.Logo}></div>
        <input type="text" className={classes.SearchBar} />
        <Button name="Search" classFromProps={classes.Button} />
        <MyAccount />
        <ShoppingCart />
      </div>
      <NavBar />
    </>
  );
};

export default Header;
