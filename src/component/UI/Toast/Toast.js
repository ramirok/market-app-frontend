import React from "react";
import { createPortal } from "react-dom";
import classes from "./Toast.module.css";

const Toast = (props) => {
  const { message, setIsOpen } = props;

  const portalRoot = document.getElementById("modal");

  const container = (
    <div className={[classes.Content, classes.Red].join(" ")} id="toast">
      <div onClick={(e) => e.stopPropagation()}>{message}</div>
      <div
        className={classes.SpinnerContainer}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <div className={classes["lds-ring"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <button>X</button>
        </div>
      </div>
    </div>
  );

  return createPortal(container, portalRoot);
};

export default Toast;
