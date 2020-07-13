import React from "react";

import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { useInputData } from "../../../utils/customHooks";
import { useUser } from "../../../context/userContext";

import classes from "./ResetPassForm.module.css";

const ResetPassForm = () => {
  const email = useInputData("email");
  const { loginData } = useUser();
  return (
    <>
      <Input {...email} label={"Email"} />
      {loginData.message ? (
        <p className={classes.Message}>{loginData.message}</p>
      ) : (
        <p className={classes.Message}>&nbsp;</p>
      )}
      <Button
        text="Ok"
        classFromProps={classes.ButtonOk}
        onClick={(e) => {
          e.preventDefault();
          fetch("http://localhost:3001/users/forgot-pass", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.value }),
          });
        }}
      />
      <br style={{ marginBottom: "2rem" }} />
      <Button
        text="Cancel"
        classFromProps={classes.ButtonCancel}
        onClick={(e) => {
          e.preventDefault();
        }}
      />
    </>
  );
};

export default ResetPassForm;
