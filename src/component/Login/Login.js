import React from "react";
import { Link } from "react-router-dom";

import classes from "./Login.module.css";

const Login = () => {
  return (
    <Link className={classes.LoginContainer} to="/auth/login">
      <span className={classes.Login}>Login</span>
    </Link>
  );
};

export default Login;
