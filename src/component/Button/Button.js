import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  /*
Recives:
 -text to display
 -custom class from props
*/
  const { text, classFromProps, onClick } = props;

  const classesForButton = [classFromProps, classes.ButtonGeneral];
  return (
    <button className={classesForButton.join(" ")} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
