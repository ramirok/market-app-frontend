import React from "react";

import { clearError } from "../../../store/actions/auth";
import classes from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import LoginForm from "../../Login/LoginForm/LoginForm";
import SignUpForm from "../../SignUp/SignUpForm/SignUpForm";

const Modal = (props) => {
  const dispatch = useDispatch();
  const { show, setShow } = props;
  // return (
  //   <>
  //     <div className={classes.Modal}>
  //       {show === "login" && <LoginForm />}
  //       {show === "signup" && <SignUpForm setShow={setShow} />}
  //     </div>
  //     <div
  //       className={classes.BackDrop}
  //       onClick={() => {
  //         dispatch(clearError());
  //         setShow("");
  //       }}
  //     ></div>
  //   </>
  // );
  return (
    <>
      <div className={classes.Modal}>
        {/* {show === "login" && <LoginForm />}
        {show === "signup" && <SignUpForm setShow={setShow} />} */}
        <LoginForm />
      </div>
      <div
        className={classes.BackDrop}
        onClick={() => {
          dispatch(clearError());
          setShow("");
        }}
      ></div>
    </>
  );
};

export default Modal;
