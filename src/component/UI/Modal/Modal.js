import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const { children, setIsOpen } = props;

  const portalRoot = document.getElementById("modal");

  const container = (
    <div
      className={classes.Backgroud}
      onClick={() => {
        setIsOpen(false);
      }}
      id="background"
    >
      <div className={classes.Content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
  return createPortal(container, portalRoot);
};

export default Modal;
