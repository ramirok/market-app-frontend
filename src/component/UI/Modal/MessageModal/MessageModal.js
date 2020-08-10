import React from "react";

import Modal from "../Modal";
import classes from "./MessageModal.module.css";

const MessageModal = (props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <p className={classes.Text}>
        Please fill in Personal Data and Address Data forms
      </p>
    </Modal>
  );
};

export default MessageModal;
