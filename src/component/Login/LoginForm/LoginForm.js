import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../UI/Spinner/Spinner";
import { login, clearError } from "../../../store/actions/auth";
import { useFormData } from "../../../utils/customHooks";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import classes from "./LoginForm.module.css";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const message = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.loading);
  const isLogged = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const dispatch = useDispatch();
  const email = useFormData("email");
  const password = useFormData("password");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 3000);
    return function () {
      clearTimeout(timer);
    };
  }, [message, dispatch]);

  useEffect(() => {
    if (isLogged) {
      window.localStorage.setItem(
        "logged",
        JSON.stringify({ userId: isLogged, token })
      );
      history.push("/");
    }
  }, [isLogged, history, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({ email: email.value, password: password.value }));
  };

  return (
    <div className={classes.Background}>
      <form className={classes.FormContainer}>
        <Input {...email} />
        <Input {...password} />
        <div className={classes.MessageContainer}>
          <p className={classes.Message}>{message}</p>
          {isLoading && <Spinner />}
        </div>
        <Button
          text="Login"
          classFromProps={classes.Button}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default LoginForm;
