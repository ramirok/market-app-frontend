import React, { useState, useEffect } from "react";

import classes from "./DropDownMenu.module.css";

const DropDownMenu = React.memo((props) => {
  // Toggle component classes when props.visible changes
  const [dropDownClasses, setDropDownClasses] = useState(classes.Hidden);

  /*
  Recives:
  -list: menu item list
  -styleCustom: custom inline-style
  -visible: visible state
  -setVisible: toggle visible state
  */
  const { styleCustom, visible, setVisible } = props;

  // When visible state changes to false, class will set to hidden in 600ms
  useEffect(() => {
    let timerToClear;
    if (!visible) {
      timerToClear = setTimeout(() => {
        setDropDownClasses(classes.Hidden);
      }, 600);
    } else {
      setDropDownClasses(classes.Visible);
    }
    return function () {
      clearTimeout(timerToClear);
    };
  }, [visible]);

  return (
    <div
      className={dropDownClasses}
      style={{ ...styleCustom }}
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      {props.children}
    </div>
  );
});

export default DropDownMenu;
