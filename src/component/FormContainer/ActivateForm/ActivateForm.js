import React, { useEffect, useState } from "react";

import FormContainer from "../FormContainer";
import Button from "../../Button/Button";
import { activateAcc } from "../../../utils/fetchServices";

import classes from "./ActivateForm.module.css";
import { useParams } from "react-router-dom";

const ActivateForm = () => {
  const { token } = useParams();

  const [message, setMessage] = useState("");

  useEffect(() => {
    activateAcc(token).then((response) => setMessage(response.message));
  });
  return (
    <FormContainer>
      <p className={classes.Message}>{message}</p>
      <Button text="Switch to login" classFromProps={classes.Button} />
    </FormContainer>
  );
};

export default ActivateForm;
