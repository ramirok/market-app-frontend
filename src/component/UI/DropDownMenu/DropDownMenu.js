import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import DropDownItem from "./DropDownItem/DropDownItem";
import classes from "./DropDownMenu.module.css";

import "./animationClasses.css";

const DropDownMenu = (props) => {
  const {
    list,
    styleCustom,
    visible,
    setVisible,
    mustClear,
    setMustClear,
  } = props;

  console.log(visible);

  const [menuHeight, setMenuHeight] = useState(null);
  const [dropDownClasses, setDropDownClasses] = useState(classes.Hidden);
  const timerToClear = useRef(null);

  useEffect(() => {
    clearTimeout(timerToClear.current);
    visible
      ? setDropDownClasses(classes.Visible)
      : setDropDownClasses(classes.Hidden);

    if (mustClear) {
      timerToClear.current = setTimeout(() => {
        setVisible(false);
      }, 600);
    }
  }, [visible, mustClear, setVisible]);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const dropDown = (
    <div
      className={dropDownClasses}
      style={{ height: menuHeight, ...styleCustom }}
      onMouseEnter={() => {
        setMustClear(false);
        setVisible(true);
      }}
      onMouseLeave={() => {
        setMustClear(true);
      }}
    >
      {list.map((el) => (
        <DropDownItem key={el}>{el}</DropDownItem>
      ))}
    </div>
  );

  return dropDown;
};

export default DropDownMenu;
