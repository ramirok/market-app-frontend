import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  const { name, classFromProps } = props;

  const classesForButton = [classFromProps, classes.ButtonGeneral];
  return <button className={classesForButton.join(" ")}>{name}</button>;
};

export default Button;
