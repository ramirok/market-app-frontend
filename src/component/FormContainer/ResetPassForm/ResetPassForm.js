import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import { useForm } from "../../../utils/customHooks";
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
      data.password,
      data.passwordConfirmation
    );
    setSucceed(response.succeed);
    setMessage(response.message);
  };

  const { handleSubmit, handleChange, data, errors } = useForm({
    onSubmit: submitNewPass,

    initialValues: {
      password: "",
      passwordConfirmation: "",
    },

    validations: {
      password: {
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)([\s\S]{6,})$/,
          message: "Must contain at least 1 letter and 1 number",
        },
        custom: {
          isValid: (value) => value.length > 5,
          message: "Must have a least 6 characters",
        },
      },
      passwordConfirmation: {
        custom: {
          isValid: (value) => value === data.password,
          message: "Must match your password",
        },
      },
    },
  });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        onChange={handleChange("password")}
        value={data.password}
        label={"New Password"}
        error={errors.password}
        type="password"
      />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        onChange={handleChange("passwordConfirmation")}
        value={data.passwordConfirmation}
        label={"Repeat new Password"}
        error={errors.passwordConfirmation}
        type="password"
      />
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
        <Button onClick={submitNewPass} disabled={loginData.loading}>
          Reset password
        </Button>
      )}
    </FormContainer>
  );
};

export default ResetPassForm;
