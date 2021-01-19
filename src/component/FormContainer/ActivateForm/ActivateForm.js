import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { fetchService } from "../../../utils/fetchServices";
import FormContainer from "../FormContainer";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./ActivateForm.module.css";

const ActivateForm = () => {
  // get token from url param
  const { token } = useParams();

  const history = useHistory();

  // message state from fetch response
  const [message, setMessage] = useState(null);

  // loading state for spinner
  const [loading, setLoading] = useState(true);

  // account activation succeed
  const [succeed, setSucceed] = useState(false);

  useEffect(() => {
    // send token for account activation
    fetchService({
      method: "post",
      url: "users/activate",
      body: { token },
    }).then((response) => {
      setSucceed(response.ok);
      setMessage(response.message);
      setLoading(false);
    });
  }, [token]);

  // if activation succeeds, show login button
  const succeedButton = succeed ? (
    <Button onClick={() => history.push("/auth/login")}>Switch to login</Button>
  ) : (
    <p className={classes.Failed}>Please try again!</p>
  );

  return (
    <FormContainer>
      {loading ? (
        <Spinner />
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
          {succeedButton}
        </>
      )}
    </FormContainer>
  );
};

export default ActivateForm;
