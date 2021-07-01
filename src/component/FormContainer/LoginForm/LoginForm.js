import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
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

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const email = useInputData({ type: "email", validate: true });
  const password = useInputData({ type: "password" });

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
    const response = await handleLogin(email.value, password.value);
    setMessage(response.message);
    response.succeed && history.push("/");
  };
  const submitLoginDemo = async () => {
    // if login succeeds, redirects to "/"
    const response = await handleLogin("fortesting@testing.com", "fortesting1");
    setMessage(response.message);
    response.succeed && history.push("/");
  };
  return (
    <FormContainer>
      <Input {...email} label="Email" />
      <br style={{ marginBottom: "3rem" }} />
      <Input {...password} label="Password" />

      <p className={classes.Message}>
        {loginData.loading ? <Spinner /> : message}
      </p>

      {/* login button */}
      <Button
        onClick={submitLoginForm}
        disabled={!email.isValid || !password.value || loginData.loading}
      >
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
      >
        Forgot password?
      </Button>
      <br style={{ marginBottom: "3rem" }} />
      <Button onClick={submitLoginDemo}>Login Demo</Button>
    </FormContainer>
  );
};

export default LoginForm;
