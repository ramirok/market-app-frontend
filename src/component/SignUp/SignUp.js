import React from "react";
import { Link } from "react-router-dom";

import classes from "./SignUp.module.css";

const SignUp = () => {
  return (
    <Link className={classes.SignUpContainer} to="/signup">
      <span className={classes.SignUp}>Sign Up</span>
    </Link>
  );
};

export default SignUp;
