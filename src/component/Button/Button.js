import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  /*
Recives:
 -classFromProps: custom styles
 -onClick: onCLick handler
 -disabled
 -inverted: white background style
*/
  const { classFromProps, onClick, disabled, inverted, type } = props;

  const classesForButton = [classFromProps, classes.ButtonGeneral];
  if (disabled) classesForButton.push(classes.Disabled);
  if (inverted) classesForButton.push(classes.Inverted);
  return (
    <button
      className={classesForButton.join(" ")}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {props.children}
    </button>
  );
};

export default Button;
