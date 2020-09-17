import React, { useState } from "react";

import { useInputData } from "../../../utils/customHooks";
import { useUser } from "../../../context/userContext";
import { putUserDetails } from "../../../utils/fetchServices";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./AddressForm.module.css";

const AddressForm = (props) => {
  // customHook for user context:
  // loginData returns ={message, loading, token}
  const { loginData } = useUser();

  // form state
  const [formState, setFormState] = useState({
    loading: false,
    message: null,
  });

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const state = useInputData("name");
  const city = useInputData("name");
  const zipCode = useInputData("number", true); //second argument true for validation
  const street = useInputData("name");
  const streetNumber = useInputData("number", true); //second argument true for validation

  return (
    <>
      <Button
        text="ok"
        classFromProps={classes.ButtonOk}
        onClick={
          // allows on click when loading = false
          !formState.loading
            ? async () => {
                setFormState({ loading: true });

                const response = await putUserDetails(loginData.token, {
                  state: state.value,
                  city: city.value,
                  zipCode: zipCode.value,
                  street: street.value,
                  streetNumber: streetNumber.value,
                });

                if (response.ok) {
                  // if fetch succeeds, sets form editable = false
                  return props.setEditable((prev) => ({
                    ...prev,
                    address: false,
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

      <Input {...state} label="State:" placeholder={props.placeholders.state} />
      <br style={{ marginBottom: "3rem" }} />
      <Input {...city} label="City:" placeholder={props.placeholders.city} />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        {...zipCode}
        label="Zip Code:"
        placeholder={props.placeholders.zipCode}
      />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        {...street}
        label="Street:"
        placeholder={props.placeholders.street}
      />
      <br style={{ marginBottom: "3rem" }} />
      <Input
        {...streetNumber}
        label="Street Number:"
        placeholder={props.placeholders.streetNumber}
      />
      <br style={{ marginBottom: "3rem" }} />
      <p className={classes.Message} style={{ color: "red" }}>
        {/* if loading shows spinner, else shows message */}
        {formState.loading ? <Spinner /> : formState.message}
      </p>
    </>
  );
};

export default AddressForm;
