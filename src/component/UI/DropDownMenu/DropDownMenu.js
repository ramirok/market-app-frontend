import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import DropDownItem from "./DropDownItem/DropDownItem";
import classes from "./DropDownMenu.module.css";

import "./animationClasses.css";

const DropDownMenu = (props) => {
  const { list, styleCustom, setOpen, mustClear, setMustClear } = props;

  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  const timerToClear = useRef(false);

  useEffect(() => {
    console.log(mustClear);

    if (mustClear) {
      timerToClear.current = setTimeout(() => {
        setOpen(false);
      }, 700);
    }
  }, [mustClear, setOpen]);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const dropDown = (
    <CSSTransition
      in={activeMenu === "main"}
      unmountOnExit
      timeout={200}
      classNames="menu-primary"
      onEnter={calcHeight}
    >
      <div className="menu">
        {list.map((el) => (
          <DropDownItem key={el}>{el}</DropDownItem>
        ))}
      </div>
    </CSSTransition>
  );

  return (
    <div
      className={classes.DropDown}
      style={{ height: menuHeight, ...styleCustom }}
      onMouseEnter={() => {
        clearTimeout(timerToClear.current);
        setMustClear(false);
        setOpen(true);
      }}
      onMouseLeave={() => {
        setMustClear(true);
      }}
    >
      {dropDown}
      {/* <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={200}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem changeState={setActiveMenu} goToMenu="settings">
            My Profile
          </DropDownItem>
          <DropDownItem>Settings</DropDownItem>
        </div>
      </CSSTransition> */}

      {/* <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={200}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem>account</DropDownItem>
          <DropDownItem>account</DropDownItem>
          <DropDownItem>account</DropDownItem>
          <DropDownItem>account</DropDownItem>
          <DropDownItem>account</DropDownItem>
          <DropDownItem>account</DropDownItem>
          <DropDownItem>account</DropDownItem>
          <DropDownItem>account</DropDownItem>

          <DropDownItem changeState={setActiveMenu} goToMenu="main">
            back
          </DropDownItem>
        </div>
      </CSSTransition> */}
    </div>
  );
};

export default DropDownMenu;
