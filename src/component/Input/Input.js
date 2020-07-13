import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  /*
Recives:
 -tpye: input type
 -value: input value
 -onChenge: onChange handler

*/
  const { type, label } = props;

  switch (type) {
    case "email":
      //Input type email

      return (
        <div className={classes.InputContainer}>
          <label htmlFor="email">{label}</label>
          {/* spread type, value, onChange atributes*/}
          <input {...props} id="email" className={classes.Input} />
        </div>
      );
    case "password":
      //Input type password

      return (
        <div className={classes.InputContainer}>
          <label htmlFor="password">{label}</label>
          {/* spread type, value, onChange atributes*/}
          <input {...props} id="password" className={classes.Input} />
        </div>
      );
    default:
      //Input type text

      return (
        <div className={classes.InputContainer}>
          <label htmlFor={type}>{label}</label>
          {/* spread type, value, onChange atributes*/}
          <input type="text" {...props} id={type} className={classes.Input} />
        </div>
      );
  }
};

export default Input;
