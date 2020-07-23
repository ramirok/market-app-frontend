import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
import FormContainer from "../FormContainer";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../Input/Input";
import classes from "./ForgotPassForm.module.css";

const ForgotPassForm = () => {
  // customHook for user context:
  // loginData returns ={message, loading, token}
  const { loginData, handleForgotPassword } = useUser();

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const email = useInputData("email", true); //second argument true for validation

  // message state from fetch response
  const [message, setMessage] = useState(null);

  // email sent successfully
  const [succeed, setSucceed] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (message) {
      // Clears message after 3 seconds
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
      <Input {...email} label={"Email"} />
      <p
        className={classes.Message}
        style={{ color: succeed ? "green" : "red" }}
      >
        {/* if loading shows spinner, else shows message */}
        {loginData.loading ? <Spinner /> : message}
      </p>

      {succeed ? (
        // if succeeds, shows check mail message
        <p className={classes.checkMail}>Check your mail!</p>
      ) : (
        // if fails, keep showing ok and cancel buttons
        <>
          <Button
            text="Ok"
            classFromProps={
              email.isValid ? classes.ButtonOk : classes.ButtonOkDisabled
            }
            onClick={
              // allows on click when email input is a valid email
              email.isValid
                ? async (e) => {
                    e.preventDefault();
                    const response = await handleForgotPassword(email.value);
                    setSucceed(response.succeed);
                    setMessage(response.message);
                  }
                : (e) => e.preventDefault()
            }
          />
          <br style={{ marginBottom: "2rem" }} />
          <Button
            text="Cancel"
            classFromProps={classes.ButtonCancel}
            onClick={(e) => {
              e.preventDefault();
              history.push("/auth/login");
            }}
          />
        </>
      )}
    </FormContainer>
  );
};

export default ForgotPassForm;
