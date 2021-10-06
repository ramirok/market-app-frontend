import React, { useState, useEffect } from "react";

import { useUser } from "../../../context/userContext";
import { useForm } from "../../../utils/customHooks";
import FormContainer from "../FormContainer";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./ChangePassForm.module.css";

const ChangePassForm = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData, handleChangePassword, handleForgotPassword } = useUser();

  // succeed status for message color
  const [succeed, setSucceed] = useState(false);

  // message state from fetch response
  const [message, setMessage] = useState(null);

  // shows 'check mail' message instead of forgot pass button
  const [checkMail, setCheckMail] = useState(false);

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

  const submitChangePass = async () => {
    const response = await handleChangePassword({
      currentPass: data.currentPass,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });
    setSucceed(response.succeed);
    setMessage(response.message);
    if (response.succeed) {
      setData({ currentPass: "", password: "", passwordConfirmation: "" });
    }
  };

  const ClickForgotPass = async () => {
    const response = await handleForgotPassword(loginData.email);
    setSucceed(response.succeed);
    setCheckMail(true);
    setMessage(response.message);
  };

  const { handleSubmit, handleChange, data, errors, setData } = useForm({
    onSubmit: submitChangePass,

    initialValues: {
      currentPass: "",
      password: "",
      passwordConfirmation: "",
    },

    validations: {
      currentPass: {
        required: {
          value: true,
          message: "Please enter your current password.",
        },
      },
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
        label="Current password."
        value={data.currentPass}
        onChange={handleChange("currentPass")}
        error={errors.currentPass}
        type="password"
      />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        label="New password."
        value={data.password}
        onChange={handleChange("password")}
        error={errors.password}
        type="password"
      />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        label="Confirm new password."
        value={data.passwordConfirmation}
        onChange={handleChange("passwordConfirmation")}
        error={errors.passwordConfirmation}
        type="password"
      />

      {/* succeed or error message */}
      <p
        className={classes.Message}
        style={{ color: succeed ? "green" : "red" }}
      >
        {loginData.loading ? <Spinner /> : message}
      </p>

      {/* ok button */}
      <Button disabled={loginData.loading}>Ok</Button>
      <br style={{ marginBottom: "3rem" }} />

      {/* don't know my password button */}
      {checkMail ? (
        <p className={classes.checkMail}>Check your mail!</p>
      ) : (
        <Button
          inverted={true}
          onClick={ClickForgotPass}
          disabled={loginData.loading}
        >
          I don't know my password
        </Button>
      )}
    </FormContainer>
  );
};

export default ChangePassForm;
