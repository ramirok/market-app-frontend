import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import { useForm } from "../../../utils/customHooks";
import { fetchService } from "../../../utils/fetchServices";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import FormContainer from "../FormContainer";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData, handleLogin } = useUser();

  const history = useHistory();

  // message state from fetch response
  const [message, setMessage] = useState(null);

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

  const submitLoginForm = async () => {
    // if login succeeds, redirects to "/"
    const response = await handleLogin(data.email, data.password);
    setMessage(response.message);
    response.succeed && history.push("/");
  };
  const submitLoginDemo = async () => {
    // if login succeeds, redirects to "/"
    const response = await handleLogin("fortesting@testing.com", "fortesting1");
    setMessage(response.message);
    response.succeed && history.push("/");
  };

  const { handleSubmit, handleChange, data, errors } = useForm({
    onSubmit: submitLoginForm,

    initialValues: {
      email: "",
      password: "",
    },

    validations: {
      email: {
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Enter a valid email.",
        },
      },
      password: {
        required: { value: true, message: "Please enter your password" },
      },
    },
  });

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        value={data.email}
        onChange={handleChange("email")}
        label="Email"
        error={errors.email}
        type="text"
      />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        value={data.password}
        onChange={handleChange("password")}
        label="Password"
        error={errors.password}
        type="password"
      />

      <p className={classes.Message}>
        {loginData.loading ? <Spinner /> : message}
      </p>

      {/* login button */}
      <Button type="submit" disabled={loginData.loading}>
        Login
      </Button>
      <br style={{ marginBottom: "3rem" }} />

      {/* login with google button */}
      <Button
        classFromProps={classes.ButtonGoogle}
        onClick={() => {
          fetchService({ method: "get", url: "users/login/google" }).then(
            (data) => (window.location.href = data.url)
          );
        }}
        type="button"
      >
        Login with Google
      </Button>
      <br style={{ marginBottom: "3rem" }} />

      {/* forgot password button */}
      <Button
        inverted={true}
        onClick={() => {
          history.push("/auth/forgot");
        }}
        type="button"
      >
        Forgot password?
      </Button>
      <br style={{ marginBottom: "3rem" }} />
      <Button
        onClick={submitLoginDemo}
        type="button"
        classFromProps={classes.button}
      >
        Login Demo
      </Button>
    </FormContainer>
  );
};

export default LoginForm;
