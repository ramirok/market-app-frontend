import React from "react";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  // customHook for user context:
  // loginData returns ={message, loading, userId, token}
  const { loginData, handleLogin } = useUser();

  // customHook useInputData returns: type, value, onChange handler
  const email = useInputData("email");
  const password = useInputData("password");

  return (
    <div className={classes.Background}>
      <form className={classes.FormContainer}>
        <Input {...email} />
        <Input {...password} />
        <div className={classes.MessageContainer}>
          <p className={classes.Message}>{loginData.message}</p>
          {loginData.loading && <Spinner />}
        </div>
        <Button
          text="Login"
          classFromProps={classes.Button}
          onClick={(e) => handleLogin(e, email.value, password.value)}
        />
      </form>
    </div>
  );
};

export default LoginForm;
