import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
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
  const email = useInputData("email", true); //second argument true for validation
  const password = useInputData("password");

  // google link
  const [googleLink, setGoogleLink] = useState("");

  useEffect(() => {
    // fetches and sets google link
    fetch("http://localhost:3001/users/login/google")
      .then((response) => response.json())
      .then((data) => setGoogleLink(data.url));
  }, []);

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

  return (
    <FormContainer>
      <>
        <Input {...email} label={"Email"} />
        <br style={{ marginBottom: "3rem" }} />
        <Input {...password} label={"Password"} />
        <p className={classes.Message}>
          {loginData.loading ? <Spinner /> : message}
        </p>
        <Button
          text="Login"
          classFromProps={
            email.isValid && password.value
              ? classes.ButtonLogin
              : classes.ButtonLoginDisabled
          }
          onClick={
            // allows on click if email is a valid email address, pasword has value and loading = false
            email.isValid && password.value && !loginData.loading
              ? async (e) => {
                  // if login succeeds, redirects to "/"
                  const response = await handleLogin(
                    e,
                    email.value,
                    password.value
                  );
                  setMessage(response.message);
                  response.succeed && history.push("/");
                }
              : (e) => e.preventDefault()
          }
        />
        <br style={{ marginBottom: "3rem" }} />

        {/* login with google button */}
        <a href={googleLink} className={classes.Link}>
          Login with Google
        </a>

        <br style={{ marginBottom: "3rem" }} />
        <Button
          text="Forgot password?"
          classFromProps={classes.ButtonForgot}
          onClick={(e) => {
            e.preventDefault();
            history.push("/auth/forgot");
          }}
        />
      </>
    </FormContainer>
  );
};

export default LoginForm;
