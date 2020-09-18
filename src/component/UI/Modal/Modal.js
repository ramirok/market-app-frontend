import React from "react";
import ReactModal from "react-modal";

import classes from "./Modal.module.css";

const Modal = (props) => {
  /*
Recives:
 -isOpen: modal open/close state
 -setIsOpen: changes isOpen state
*/
  const { isOpen, setIsOpen } = props;

  // Close modal when backdrop is clicked
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ReactModal
      // Modal component settings
      onRequestClose={closeModal}
      className={classes.Content}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{ overlay: { zIndex: "3" } }}
    >
      {props.children}
    </ReactModal>
  );
};

export default Modal;
