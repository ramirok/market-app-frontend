import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  const { type } = props;
  switch (type) {
    case "email":
      return (
        <div className={classes.InputContainer}>
          <label htmlFor="email">Email</label>
          <input {...props} id="email" className={classes.Input} />
        </div>
      );
    case "password":
      return (
        <div className={classes.InputContainer}>
          <label htmlFor="password">Password</label>
          <input {...props} id="password" className={classes.Input} />
        </div>
      );
    default:
      const firstLetter = type.charAt(0).toUpperCase();
      return (
        <div className={classes.InputContainer}>
          <label htmlFor={type}>{`${firstLetter}${type.slice(1)}`}</label>
          <input type="text" {...props} id={type} className={classes.Input} />
        </div>
      );
  }
};

export default Input;
