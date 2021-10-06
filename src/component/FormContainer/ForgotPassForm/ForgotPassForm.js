import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import { useForm } from "../../../utils/customHooks";
import FormContainer from "../FormContainer";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../Input/Input";
import classes from "./ForgotPassForm.module.css";

const ForgotPassForm = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData, handleForgotPassword } = useUser();

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
    const response = await handleForgotPassword(data.email);
    setSucceed(response.succeed);
    setMessage(response.message);
  };

  const { handleSubmit, handleChange, data, errors } = useForm({
    onSubmit: submitForgotPassForm,

    initialValues: {
      email: "",
    },

    validations: {
      email: {
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Enter a valid email.",
        },
      },
    },
  });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        value={data.email}
        onChange={handleChange("email")}
        label={"Email"}
        error={errors.email}
        type="text"
      />
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
          <Button disabled={loginData.loading}>Ok</Button>
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
