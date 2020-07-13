import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import ResetPassword from "./ForgotPassForm/ForgotPassForm";
import classes from "./LoginForm.module.css";
import FormContainer from "../FormContainer";

// SVG imports
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";

const LoginForm = () => {
  // customHook for user context:
  // loginData returns ={message, loading, userId, token}
  const { loginData, handleLogin } = useUser();

  const history = useHistory();

  // customHook useInputData returns: type, value, onChange handler
  const email = useInputData("email");
  const password = useInputData("password");

  const [forgot, setForgot] = useState(false);

  return (
    <FormContainer>
      {/* <div className={classes.Background}>
        <form className={classes.FormContainer}> */}
      {forgot ? (
        <ResetPassword setForgot={setForgot} />
      ) : (
        <>
          <Input {...email} label={"Email"} />
          <br style={{ marginBottom: "2rem" }} />
          <Input {...password} label={"Password"} />
          {loginData.loading ? (
            <p className={classes.Message}>
              <Spinner
                stroke="black"
                strokeWidth="5"
                style={{
                  display: "block",
                  margin: "auto",
                  height: "3.5rem",
                  width: "3.5rem",
                }}
              />
            </p>
          ) : loginData.message ? (
            <p className={classes.Message}>{loginData.message}</p>
          ) : (
            <p className={classes.Message}>&nbsp;</p>
          )}
          <Button
            text="Login"
            classFromProps={classes.ButtonLogin}
            onClick={async (e) => {
              // if login succeeds, redirects to "/"
              (await handleLogin(e, email.value, password.value)) &&
                history.push("/");
            }}
          />
          <br style={{ marginBottom: "2rem" }} />
          <Button
            text="Forgot password?"
            classFromProps={classes.ButtonForgot}
            onClick={(e) => {
              e.preventDefault();
              setForgot(true);
            }}
          />
        </>
      )}
      {/* </form>
      </div> */}
    </FormContainer>
  );
};

export default LoginForm;
