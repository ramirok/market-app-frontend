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
    fetchService("post", "users/activate", null, { token }).then((response) => {
      setSucceed(response.ok);
      setMessage(response.message);
      setLoading(false);
    });
  }, [token]);

  const succeedButton = succeed ? (
    // shows login button if activation succeeds
    <Button
      classFromProps={classes.Button}
      onClick={() => history.push("/auth/login")}
    >
      Switch to login
    </Button>
  ) : (
    // show try again message if activation fails
    <p className={classes.Failed}>Please try again!</p>
  );

  return (
    <FormContainer>
      {/* shows spinner if loading = true */}
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
