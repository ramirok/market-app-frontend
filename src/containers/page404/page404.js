import React from "react";

import classes from "./page404.module.css";

// SVG imports
import { ReactComponent as Closed } from "../../assets/closed.svg";
import { ReactComponent as Missing } from "../../assets/magnifying.svg";

const page404 = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.IconsContainer}>
        <Closed className={classes.Store} />
        <Missing className={classes.Missing} />
      </div>
      <p>Page not found</p>
    </div>
  );
};

export default page404;
