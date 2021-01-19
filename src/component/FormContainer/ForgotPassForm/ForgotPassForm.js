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
  // loginData returns ={name, email, token}
  const { loginData, handleForgotPassword } = useUser();

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const email = useInputData({ type: "email", validate: "true" });

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

  const submitForgotPassForm = async () => {
    const response = await handleForgotPassword(email.value);
    setSucceed(response.succeed);
    setMessage(response.message);
  };

  return (
    <FormContainer>
      <Input {...email} label={"Email"} />
      <p
        className={classes.Message}
        style={{ color: succeed ? "green" : "red" }}
      >
        {loginData.loading ? <Spinner /> : message}
      </p>

      {succeed ? (
        // if succeeds, shows 'check mail' message
        <p className={classes.checkMail}>Check your mail!</p>
      ) : (
        // if fails, keep showing ok and cancel buttons
        <>
          <Button
            onClick={submitForgotPassForm}
            disabled={!email.isValid || loginData.loading}
          >
            Ok
          </Button>
          <br style={{ marginBottom: "3rem" }} />
          <Button
            inverted={true}
            onClick={() => {
              history.push("/auth/login");
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </FormContainer>
  );
};

export default ForgotPassForm;
