import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useUser } from "../../../context/userContext";
import FormContainer from "../FormContainer";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./GoogleForm.module.css";

const GoogleForm = () => {
  // get token from url param
  const { search } = useLocation();

  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData, handleLoginGoogle } = useUser();

  // message state from fetch response
  const [message, setMessage] = useState(null);

  // account activation succeed
  const [succeed, setSucceed] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!search) {
      return history.push("/");
    }

    handleLoginGoogle(search).then((response) => {
      if (response.succeed) {
        return history.push("/");
      }
      // login failed
      setSucceed(false);
      setMessage(response.message);
    });
  }, [handleLoginGoogle, search, history]);

  return (
    <FormContainer>
      {loginData.loading ? (
        <span style={{ margin: "0 auto" }}>
          <Spinner />
        </span>
      ) : (
        <>
          <p
            className={classes.Message}
            style={{
              color: succeed ? "green" : "red",
            }}
          >
            {message}
          </p>
          <p className={classes.Failed}>Please try again!</p>
        </>
      )}
    </FormContainer>
  );
};

export default GoogleForm;
