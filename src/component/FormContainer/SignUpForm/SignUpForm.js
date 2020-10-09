import React, { useEffect, useState } from "react";

import { fetchService } from "../../../utils/fetchServices";
import { useInputData } from "../../../utils/customHooks";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import FormContainer from "../FormContainer";
import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  // Signup state
  const [signupData, setSignupData] = useState({
    message: null,
    loading: false, //when true shows spinner
    succeed: false, //When true shows switch to login button
  });

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const name = useInputData("name", true); //second argument true for validation
  const email = useInputData("email", true); //second argument true for validation
  const password = useInputData("password", true); //second argument true for validation

  useEffect(() => {
    // clears message after 3s
    const timer = setTimeout(() => {
      setSignupData((prevState) => ({ ...prevState, message: null }));
    }, 3000);
    return function () {
      clearTimeout(timer);
    };
  }, [signupData.message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupData((prevState) => ({
      ...prevState,
      loading: true,
    }));

    // Sends request with signup data
    const response = await fetchService("post", "users", null, {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    setSignupData((prevState) => ({
      ...prevState,
      message: response.message,
      loading: false,
      succeed: response.ok,
    }));
    if (response.ok) {
      name.onChange({ target: { value: "" } });
      email.onChange({ target: { value: "" } });
      password.onChange({ target: { value: "" } });
    }
  };

  return (
    <FormContainer>
      <Input {...name} label={"User name"} />
      <br style={{ marginBottom: "3rem" }} />
      <Input {...email} label={"Email"} />
      <br style={{ marginBottom: "3rem" }} />
      <Input {...password} label={"Password"} />
      <p
        className={classes.Message}
        style={{ color: signupData.succeed ? "green" : "red" }}
      >
        {signupData.loading ? <Spinner /> : signupData.message}
      </p>

      {/* if succeed shows check email message, else show sign up button */}
      {signupData.succeed ? (
        <p className={classes.checkMail}>Check your mail!</p>
      ) : (
        <Button
          text="Sign Up"
          classFromProps={
            email.isValid && password.isValid && name.isValid
              ? classes.Button
              : classes.ButtonDisabled
          }
          onClick={
            // allows onClick when email, password and name input are valid, and loading = false
            email.isValid &&
            password.isValid &&
            name.isValid &&
            !signupData.loading
              ? handleSubmit
              : (e) => e.preventDefault()
          }
        />
      )}
    </FormContainer>
  );
};

export default SignUpForm;
