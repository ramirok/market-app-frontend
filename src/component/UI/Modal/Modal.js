import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

// const Modal = (props) => {
//   const { children, setIsOpen } = props;

//   const elRef = useRef(null);

//   if (!elRef.current) {
//     const div = document.createElement("div");
//     elRef.current = div;
//     div.className = classes.Backgroud;
//     div.id = "background";
//     div.onclick = (e) => {
//       if (e.target.id === "background") {
//         setIsOpen(false);
//       }
//     };
//   }

//   useEffect(() => {
//     const portalRoot = document.getElementById("modal");
//     portalRoot.appendChild(elRef.current);

//     return () => portalRoot.removeChild(elRef.current);
//   }, []);

//   return createPortal(
//     <div className={classes.Content}>{children}</div>,
//     elRef.current
//   );
// };

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
