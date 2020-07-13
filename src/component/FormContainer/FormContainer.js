import React from "react";

import classes from "./FormContainer.module.css";

const FormContainer = (props) => {
  return (
    <div className={classes.Background}>
      <form className={classes.FormContainer}>{props.children}</form>
    </div>
  );
};

export default FormContainer;
