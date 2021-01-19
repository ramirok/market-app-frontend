import React, { useState, useEffect } from "react";

import { useWindowResize } from "../../../utils/customHooks";
import classes from "./DropDownMenu.module.css";

const DropDownMenu = React.memo((props) => {
  /*
  Recives:
  -visible: visible state
  -setVisible: toggle visible state
  */
  const { visible, setVisible } = props;

  // toggle component classes when props.visible changes
  const [dropDownClasses, setDropDownClasses] = useState(classes.Hidden);

  const windowWidth = useWindowResize();

  useEffect(() => {
    // When visible changes to false, class will set to hidden in 600ms
    let timerToClear;

    if (!visible) {
      // if on mobile or width<1000, hide menu inmediately
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? setDropDownClasses(classes.Hidden)
        : (timerToClear = setTimeout(() => {
            setDropDownClasses(classes.Hidden);
          }, 600));
    } else {
      setDropDownClasses(classes.Visible);
    }

    return function () {
      clearTimeout(timerToClear);
    };
  }, [visible, windowWidth]);

  return (
    <div
      className={dropDownClasses}
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
