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
  // loginData returns ={name, email, token}
  const { loginData, handleResetPassword } = useUser();

  // reset pass succeeded
  const [succeed, setSucceed] = useState(false);

  // message state from fetch response
  const [message, setMessage] = useState(null);

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const password = useInputData({ type: "password", validate: true });
  const passwordConfirmation = useInputData({
    type: "password",
    validate: true,
    confirmPass: password.value,
  });

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

  const submitNewPass = async () => {
    const response = await handleResetPassword(
      token,
      password.value,
      passwordConfirmation.value
    );
    setSucceed(response.succeed);
    setMessage(response.message);
  };

  return (
    <FormContainer>
      <Input {...password} label={"New Password"} />
      <br style={{ marginBottom: "3rem" }} />
      <Input {...passwordConfirmation} label={"Repeat new Password"} />
      <br style={{ marginBottom: "3rem" }} />
      <p
        className={classes.Message}
        style={{ color: succeed ? "green" : "red" }}
      >
        {loginData.loading ? <Spinner /> : message}
      </p>

      {/* if succeeds show go back button */}
      {succeed ? (
        <Button
          onClick={() =>
            loginData.token
              ? history.push("/app/account")
              : history.push("/auth/login")
          }
        >
          Go back
        </Button>
      ) : (
        <Button
          onClick={submitNewPass}
          disabled={
            !password.isValid ||
            !passwordConfirmation.isValid ||
            loginData.loading
          }
        >
          Reset password
        </Button>
      )}
    </FormContainer>
  );
};

export default ResetPassForm;
