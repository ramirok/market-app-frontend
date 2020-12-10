import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  /*
Recives:
 -classFromPros: custom styles
 -onClick: onCLick handler
 -disabled
*/
  const { classFromProps, onClick, disabled } = props;

  const classesForButton = [classFromProps, classes.ButtonGeneral];
  return (
    <button
      className={classesForButton.join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
