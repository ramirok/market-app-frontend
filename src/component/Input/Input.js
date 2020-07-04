import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  /*
Recives:
 -tpye: input type
 -value: input value
 -onChenge: onChange handler

*/
  const { type } = props;

  switch (type) {
    case "email":
      //Input type email

      return (
        <div className={classes.InputContainer}>
          <label htmlFor="email">Email</label>
          {/* spread type, value, onChange atributes*/}
          <input {...props} id="email" className={classes.Input} />
        </div>
      );
    case "password":
      //Input type password

      return (
        <div className={classes.InputContainer}>
          <label htmlFor="password">Password</label>
          {/* spread type, value, onChange atributes*/}
          <input {...props} id="password" className={classes.Input} />
        </div>
      );
    default:
      //Input type text

      const firstLetter = type.charAt(0).toUpperCase(); //Capitalize first letter for label
      return (
        <div className={classes.InputContainer}>
          <label htmlFor={type}>{`${firstLetter}${type.slice(1)}`}</label>
          {/* spread type, value, onChange atributes*/}
          <input type="text" {...props} id={type} className={classes.Input} />
        </div>
      );
  }
};

export default Input;
