import React from "react";

import classes from "./FormContainer.module.css";

const FormContainer = (props) => {
  return (
    <>
      <div className={classes.Background}></div>
      <form className={classes.FormContainer}>{props.children}</form>
    </>
  );
};

export default FormContainer;
