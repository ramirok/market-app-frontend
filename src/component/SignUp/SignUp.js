import React from "react";

import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <Link className={classes.SignUpContainer} to="/signup">
      <span className={classes.SignUp}>Sign Up</span>
    </Link>
  );
};

export default SignUp;
