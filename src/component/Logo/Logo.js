import React from "react";
import { Link } from "react-router-dom";

import classes from "./Logo.module.css";

// SVG imports
import { ReactComponent as AppLogo } from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div className={classes.LogoContainer}>
      <Link to="/">
        <AppLogo className={classes.Logo} />
      </Link>
      {<p className={classes.AppName}>Market App</p>}
    </div>
  );
};

export default Logo;
