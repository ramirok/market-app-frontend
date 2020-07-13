import React from "react";

import FormContainer from "../FormContainer";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import classes from "./ResetPassForm.module.css";
import { useHistory, useParams } from "react-router-dom";
import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";

import { ReactComponent as Spinner } from "../../../assets/spinner.svg";

const ResetPassForm = () => {
  const { token } = useParams();

  const history = useHistory();
  const { loginData, handleResetPassword } = useUser();
  const newPass = useInputData("password");
  const newPassRepeat = useInputData("password");
  return (
    <FormContainer>
      <Input {...newPass} label={"New Password"} />
      <br style={{ marginBottom: "2rem" }} />{" "}
      <Input {...newPassRepeat} label={"Repeat new Password"} />
      <br style={{ marginBottom: "2rem" }} />
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
        text="Reset password"
        classFromProps={classes.Button}
        onClick={async (e) => {
          e.preventDefault();
          await handleResetPassword(token, newPass.value);
        }}
      />
    </FormContainer>
  );
};

export default ResetPassForm;
