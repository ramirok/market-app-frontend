import React, { useState } from "react";

import { useInputData } from "../../../utils/customHooks";
import { useUser } from "../../../context/userContext";
import { fetchService } from "../../../utils/fetchServices";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./AddressForm.module.css";

const AddressForm = (props) => {
  /*
Recives:
 -placeholders: placeholders for inputs
 -dispatch: dispatch actions to reducer
*/
  const { placeholders, dispatch } = props;

  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // form state
  const [formState, setFormState] = useState({
    loading: false,
    message: null,
  });

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const state = useInputData({ type: "text" });
  const city = useInputData({ type: "text" });
  const zipCode = useInputData({ type: "number", validate: true });
  const street = useInputData({ type: "text" });
  const streetNumber = useInputData({ type: "number", validate: true });

  const submitAddressData = async () => {
    setFormState({ loading: true });

    const response = await fetchService({
      method: "put",
      url: "users/user-details",
      token: loginData.token,
      body: {
        state: state.value,
        city: city.value,
        zipCode: zipCode.value,
        street: street.value,
        streetNumber: streetNumber.value,
      },
    });

    if (response.ok) {
      return dispatch({ type: "SUBMIT_ADDRESS" });
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
        onClick={submitAddressData}
        disabled={formState.loading}
      >
        ok
      </Button>

      <Input {...state} label="State:" placeholder={placeholders.state} />
      <br style={{ marginBottom: "3rem" }} />

      <Input {...city} label="City:" placeholder={placeholders.city} />
      <br style={{ marginBottom: "3rem" }} />

      <Input
        {...zipCode}
        label="Zip Code:"
        placeholder={placeholders.zipCode}
      />
      <br style={{ marginBottom: "3rem" }} />

      <Input {...street} label="Street:" placeholder={placeholders.street} />
      <br style={{ marginBottom: "3rem" }} />

      <Input
        {...streetNumber}
        label="Street Number:"
        placeholder={placeholders.streetNumber}
      />
      <br style={{ marginBottom: "3rem" }} />
      <p className={classes.Message} style={{ color: "red" }}>
        {formState.loading ? <Spinner /> : formState.message}
      </p>
    </form>
  );
};

export default AddressForm;
