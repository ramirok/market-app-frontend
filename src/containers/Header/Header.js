import React from "react";

import { useUser } from "../../context/userContext";
import { useWindowResize } from "../../utils/customHooks";
import Logo from "../../component/Logo/Logo";
import SearchBar from "../../component/SearchBar/SearchBar";
import NavBar from "../../component/NavBar/NavBar";
import ShoppingCart from "../../component/ShoppingCart/ShoppingCart";
import MyAccount from "../../component/MyAccount/MyAccount";
import Login from "../../component/Login/Login";
import SignUp from "../../component/SignUp/SignUp";
import classes from "./Header.module.css";

const Header = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // customHook for window size
  const windowWidth = useWindowResize();

  return (
    <div className={classes.Background}>
      <div className={classes.HeaderContainer}>
        <Logo />
        <div className={classes.BarAndLinks}>
          <SearchBar />

          {/* only shows navBar when screen is wider than 1000 */}
          {windowWidth > 1000 && <NavBar />}
        </div>

        <div className={classes.Menu}>
          {loginData.token ? (
            <>
              {/* if user is loggedIn */}
              <MyAccount />
              <ShoppingCart />
            </>
          ) : (
            <>
              {/* if user isn't loggedIn */}
              <Login />
              <SignUp />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
