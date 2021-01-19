import React, { useState } from "react";

import { useInputData } from "../../../utils/customHooks";
import { useUser } from "../../../context/userContext";
import { fetchService } from "../../../utils/fetchServices";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./PersonalInfoForm.module.css";

const PersonalInfoForm = (props) => {
  /*
Recives:
 -placeholders: placeholders for inputs
 -dispatch actions to reducer
*/
  const { placeholders, dispatch } = props;

  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  const [formState, setFormState] = useState({
    loading: false,
    message: null,
  });

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const fullName = useInputData({ type: "text", validate: true });
  const phoneNumber = useInputData({ type: "number", validate: true });

  const submitPersonalData = async () => {
    setFormState((prev) => ({ ...prev, loading: true }));

    const response = await fetchService({
      method: "put",
      url: "users/user-details",
      token: loginData.token,
      body: {
        fullName: fullName.value,
        phoneNumber: phoneNumber.value,
      },
    });

    if (response.ok) {
      return dispatch({ type: "SUBMIT_PERSONAL_INFO" });
    }

    // if fetch fails, sets message
    setFormState({
      loading: false,
      message: response.message,
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Button
        classFromProps={classes.ButtonOk}
        onClick={submitPersonalData}
        disabled={formState.loading}
      >
        ok
      </Button>
      <Input
        {...fullName}
        label="Full Name:"
        placeholder={placeholders.fullName}
      />
      <br style={{ marginBottom: "3rem" }} />

      <Input
        {...phoneNumber}
        label="Phone Number:"
        placeholder={placeholders.phoneNumber}
      />
      <br style={{ marginBottom: "3rem" }} />

      <p
        className={classes.Message}
        style={{ color: formState.succeed ? "green" : "red" }}
      >
        {formState.loading ? <Spinner /> : formState.message}
      </p>
    </form>
  );
};

export default PersonalInfoForm;
