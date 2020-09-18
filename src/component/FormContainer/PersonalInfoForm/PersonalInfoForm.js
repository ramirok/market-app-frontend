import React, { useState } from "react";

import { useInputData } from "../../../utils/customHooks";
import { useUser } from "../../../context/userContext";
import { putUserDetails } from "../../../utils/fetchServices";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./PersonalInfoForm.module.css";

const PersonalInfoForm = (props) => {
  /*
Recives:
 -setEditable: set editable to false when the form is successfully submited
 -placeholders: placeholders for inputs
*/
  const { setEditable, placeholders } = props;

  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // form state
  const [formState, setFormState] = useState({
    loading: false,
    message: null,
  });

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const fullName = useInputData("name", true);
  const phoneNumber = useInputData("number", true); //second argument true for validation

  return (
    <>
      <Button
        text="ok"
        classFromProps={classes.ButtonOk}
        onClick={
          // allows on click when loading = false
          !formState.loading
            ? async () => {
                setFormState((prev) => ({ ...prev, loading: true }));

                const response = await putUserDetails(loginData.token, {
                  fullName: fullName.value,
                  phoneNumber: phoneNumber.value,
                });

                if (response.ok) {
                  // if fetch succeeds, sets form editable = false
                  return setEditable((prev) => ({
                    ...prev,
                    personalInfo: false,
                    newFetch: true,
                  }));
                }

                // if fetch fails, sets message
                setFormState({
                  loading: false,
                  message: response.message,
                });
              }
            : null
        }
      />
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
        {/* if loading shows spinner, else shows message */}
        {formState.loading ? <Spinner /> : formState.message}
      </p>
    </>
  );
};

export default PersonalInfoForm;
