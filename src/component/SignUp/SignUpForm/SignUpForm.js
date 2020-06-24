import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../../../store/actions/signup";
import { useFormData } from "../../../utils/customHooks";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import classes from "./SignUpForm.module.css";

const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const isSignup = useSelector((state) => state.signup);
  const name = useFormData("name");
  const email = useFormData("email");
  const password = useFormData("password");

  useEffect(() => {
    if (isSignup.error) {
      props.setShow("login");
    }
    // !isSignup.error && props.setShow("login");
  }, [isSignup, props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      signup({ name: name.value, email: email.value, password: password.value })
    );
  };

  return (
    <div className={classes.Background}>
      <form className={classes.FormContainer}>
        <Input {...name} />
        <Input {...email} />
        <Input {...password} />
        <p className={classes.Message}>{isSignup.error}</p>
        <Button
          text="Sign Up"
          classFromProps={classes.Button}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default SignUpForm;
