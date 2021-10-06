import React, { useEffect, useState } from "react";

import { fetchService } from "../../../utils/fetchServices";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import FormContainer from "../FormContainer";
import classes from "./SignUpForm.module.css";

import { useForm } from "../../../utils/customHooks";

const SignUpForm = () => {
  // Signup state
  const [signupData, setSignupData] = useState({
    message: null,
    loading: false, //when true shows spinner
    succeed: false, //When true shows switch to login button
  });

  useEffect(() => {
    // clears message after 3s
    const timer = setTimeout(() => {
      setSignupData((prevState) => ({ ...prevState, message: null }));
    }, 3000);
    return function () {
      clearTimeout(timer);
    };
  }, [signupData.message]);

  const submitSignupForm = async () => {
    setSignupData((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await fetchService({
      method: "post",
      url: "users",
      body: {
        name: data.userName,
        email: data.email,
        password: data.password,
      },
    });
    setSignupData((prevState) => ({
      ...prevState,
      message: response.message,
      loading: false,
      succeed: response.ok,
    }));
    if (response.ok) {
      setData({ userName: "", email: "", password: "" });
    }
  };

  const { handleSubmit, handleChange, data, setData, errors } = useForm({
    onSubmit: submitSignupForm,

    initialValues: {
      userName: "",
      email: "",
      password: "",
    },

    validations: {
      userName: {
        pattern: {
          value: /^[a-zA-Z0-9_]*$/,
          message: "Only alphanumeric charactes.",
        },
        custom: {
          isValid: (value) => value.length > 3,
          message: "Must have a least 4 characters.",
        },
      },
      email: {
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Enter a valid email.",
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
    },
  });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        onChange={handleChange("userName")}
        value={data.userName}
        label={"User name"}
        error={errors.userName}
        type="text"
      />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        onChange={handleChange("email")}
        value={data.email}
        label={"Email"}
        error={errors.email}
        type="text"
      />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        onChange={handleChange("password")}
        value={data.password}
        label={"Password"}
        error={errors.password}
        type="password"
      />
      <p
        className={classes.Message}
        style={{ color: signupData.succeed ? "green" : "red" }}
      >
        {signupData.loading ? <Spinner /> : signupData.message}
      </p>

      {/* if succeed show 'check email' message, otherwise show sign up button */}
      {signupData.succeed ? (
        <p className={classes.checkMail}>Check your mail!</p>
      ) : (
        <Button disabled={signupData.loading}>Sign Up</Button>
      )}
    </FormContainer>
  );
};

export default SignUpForm;
