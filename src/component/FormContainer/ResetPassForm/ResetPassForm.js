import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
import FormContainer from "../FormContainer";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./ResetPassForm.module.css";

const ResetPassForm = () => {
  // get token from url param
  const { token } = useParams();

  const history = useHistory();

  // customHook for user context:
  // loginData returns ={message, loading, token}
  const { loginData, handleResetPassword } = useUser();

  // reset pass succeed
  const [succeed, setSucceed] = useState(false);

  // message state from fetch response
  const [message, setMessage] = useState(null);

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const password = useInputData("password", true); //second argument true for validation
  const passwordConfirmation = useInputData("password", true, password.value); //second argument true for validation

  useEffect(() => {
    if (message) {
      // clears message after 3s
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
      <Input {...password} label={"New Password"} />
      <br style={{ marginBottom: "2rem" }} />
      <Input {...passwordConfirmation} label={"Repeat new Password"} />
      <br style={{ marginBottom: "2rem" }} />
      <p
        className={classes.Message}
        style={{ color: succeed ? "green" : "red" }}
      >
        {loginData.loading ? <Spinner /> : message}
      </p>
      {succeed ? (
        // if succeeds show login button
        <Button
          text="Switch to login"
          classFromProps={classes.Button}
          onClick={() => history.push("/auth/login")}
        />
      ) : (
        <Button
          text="Reset password"
          classFromProps={
            password.isValid && passwordConfirmation.isValid
              ? classes.Button
              : classes.ButtonDisabled
          }
          onClick={
            // allows on click if password and password confirmation are valid
            password.isValid && passwordConfirmation.isValid
              ? async (e) => {
                  e.preventDefault();
                  const response = await handleResetPassword(
                    token,
                    password.value,
                    passwordConfirmation.value
                  );
                  setSucceed(response.succeed);
                  setMessage(response.message);
                }
              : (e) => e.preventDefault()
          }
        />
      )}
    </FormContainer>
  );
};

export default ResetPassForm;
