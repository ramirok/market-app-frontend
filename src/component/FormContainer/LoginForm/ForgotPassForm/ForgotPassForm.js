import React from "react";

import Button from "../../../Button/Button";
import Input from "../../../Input/Input";

import classes from "./ForgotPassForm.module.css";
import { useInputData } from "../../../../utils/customHooks";
import { useUser } from "../../../../context/userContext";

// SVG imports
import { ReactComponent as Spinner } from "../../../../assets/spinner.svg";

const ResetPassForm = (props) => {
  const email = useInputData("email");

  const { loginData, handleForgotPassword } = useUser();

  const { setForgot } = props;
  return (
    <>
      <Input {...email} label={"Email"} />
      {loginData.loading ? (
        <p className={classes.Message}>
          <Spinner
            stroke="black"
            strokeWidth="5"
            style={{
              display: "block",
              margin: "auto",
              height: "3.5rem",
              width: "3.5rem",
            }}
          />
        </p>
      ) : loginData.message ? (
        <p className={classes.Message}>{loginData.message}</p>
      ) : (
        <p className={classes.Message}>&nbsp;</p>
      )}
      <Button
        text="Ok"
        classFromProps={classes.ButtonOk}
        onClick={(e) => {
          e.preventDefault();
          handleForgotPassword(email.value);
        }}
      />
      <br style={{ marginBottom: "2rem" }} />
      <Button
        text="Cancel"
        classFromProps={classes.ButtonCancel}
        onClick={(e) => {
          e.preventDefault();
          setForgot(false);
        }}
      />
    </>
  );
};

export default ResetPassForm;
