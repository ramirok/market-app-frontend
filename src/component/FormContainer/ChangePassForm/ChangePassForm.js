import React, { useState, useEffect } from "react";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
import FormContainer from "../FormContainer";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./ChangePassForm.module.css";

const ChangePassForm = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData, handleChangePassword, handleForgotPassword } = useUser();

  // succeed status for message
  const [succeed, setSucceed] = useState(false);

  // message state from fetch response
  const [message, setMessage] = useState(null);

  //
  const [checkMail, setCheckMail] = useState(false);

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const currentPass = useInputData("password");
  const password = useInputData("password", true); //second argument true for validation
  const passwordConfirmation = useInputData("password", true, password.value); //second argument true for validation

  useEffect(() => {
    if (message) {
      // clears message after 3 seconds
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <FormContainer>
      <Input {...currentPass} label="Current password." />
      <br style={{ marginBottom: "3rem" }} />
      <Input {...password} label="New password." />
      <br style={{ marginBottom: "3rem" }} />
      <Input {...passwordConfirmation} label="Confirm new password." />

      {/* message */}
      <p
        className={classes.Message}
        style={{ color: succeed ? "green" : "red" }}
      >
        {loginData.loading ? <Spinner /> : message}
      </p>

      <Button
        text="Ok"
        classFromProps={
          password.isValid &&
          passwordConfirmation.isValid &&
          currentPass.value &&
          !loginData.loading
            ? classes.ButtonOk
            : classes.ButtonDisabled
        }
        onClick={
          // allows on click if password, passwordConfirmation = true, current password has value and loading = false
          password.isValid &&
          passwordConfirmation.isValid &&
          currentPass.value &&
          !loginData.loading
            ? async (e) => {
                e.preventDefault();
                const response = await handleChangePassword({
                  currentPass: currentPass.value,
                  password: password.value,
                  passwordConfirmation: passwordConfirmation.value,
                });
                setSucceed(response.succeed);
                setMessage(response.message);
                if (response.succeed) {
                  currentPass.onChange({ target: { value: "" } });
                  password.onChange({ target: { value: "" } });
                  passwordConfirmation.onChange({ target: { value: "" } });
                }
              }
            : (e) => e.preventDefault()
        }
      />
      <br style={{ marginBottom: "3rem" }} />

      {/* if message check mail if reset pass link sent successfully */}
      {checkMail ? (
        <p className={classes.checkMail}>Check your mail!</p>
      ) : (
        <Button
          text="I don't know my password"
          classFromProps={classes.ButtonForgot}
          onClick={async (e) => {
            e.preventDefault();
            const response = await handleForgotPassword(loginData.email);
            setSucceed(response.succeed);
            setCheckMail(true);
            setMessage(response.message);
          }}
        />
      )}
    </FormContainer>
  );
};

export default ChangePassForm;
