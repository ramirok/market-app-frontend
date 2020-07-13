import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { signup } from "../../../utils/fetchServices";
import { useInputData } from "../../../utils/customHooks";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import classes from "./SignUpForm.module.css";
import FormContainer from "../FormContainer";

// SVG imports
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";

const SignUpForm = () => {
  const history = useHistory();

  // Signup state
  const [signupData, setSignupData] = useState({
    message: null,
    loading: false, //when true shows spinner
    succeed: false, //When true shows switch to login button
  });

  // customHook useInputData returns: type, value, onChange handler
  const name = useInputData("name");
  const email = useInputData("email");
  const password = useInputData("password");

  useEffect(() => {
    // When signUp fails, clears error after 3s
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
    // Sends request
    const response = await signup({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    response.error
      ? // if fails, sets error
        setSignupData((prevState) => ({
          ...prevState,
          message: response.error,
          loading: false,
        }))
      : // if succeed, sets succeed to true
        setSignupData((prevState) => ({
          ...prevState,
          message: response.message,
          succeed: true,
          loading: false,
        }));
  };

  return (
    <FormContainer>
      {/* <div className={classes.Background}>
        <form className={classes.FormContainer}> */}
      <Input {...name} label={"Name"} />
      <br style={{ marginBottom: "2rem" }} />
      <Input {...email} label={"Email"} />
      <br style={{ marginBottom: "2rem" }} />
      <Input {...password} label={"Password"} />
      {/* <div className={classes.MessageContainer}> */}
      {signupData.loading ? (
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
      ) : signupData.message ? (
        <p className={classes.Message}>{signupData.message}</p>
      ) : (
        <p className={classes.Message}>&nbsp;</p>
      )}
      {/* </div> */}
      {/* if succeed shows switch to login button, else show sign up button */}
      {signupData.succeed ? (
        <Button
          text="Switch to login"
          classFromProps={classes.Button}
          onClick={() => history.push("/login")}
        />
      ) : (
        <Button
          text="Sign Up"
          classFromProps={classes.Button}
          onClick={handleSubmit}
        />
      )}
      {/* </form>
      </div> */}
    </FormContainer>
  );
};

export default SignUpForm;
