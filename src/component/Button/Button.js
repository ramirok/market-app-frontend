import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  /*
Recives:
 -text: text to display
 -classFromPros: custom styles
 -onClick: onCLick handler
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
