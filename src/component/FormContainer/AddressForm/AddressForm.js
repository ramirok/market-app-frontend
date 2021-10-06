import React, { useState } from "react";

import { useForm } from "../../../utils/customHooks";
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

  const submitAddressData = async () => {
    setFormState({ loading: true });

    const response = await fetchService({
      method: "put",
      url: "users/user-details",
      token: loginData.token,
      body: {
        state: data.state,
        city: data.city,
        zipCode: data.zipCode,
        street: data.street,
        streetNumber: data.streetNumber,
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

  const { handleSubmit, handleChange, data, errors } = useForm({
    onSubmit: submitAddressData,

    initialValues: {
      state: "",
      city: "",
      zipCode: "",
      street: "",
      streetNumber: "",
    },

    validations: {
      state: {
        custom: {
          isValid: (value) => (value ? value.length > 3 : true),
          message: "Must be at least 4 characters long.",
        },
      },
      city: {
        custom: {
          isValid: (value) => (value ? value.length > 3 : true),
          message: "Must be at least 4 characters long.",
        },
      },
      zipCode: {
        pattern: { value: /^[0-9]*$/, message: "Enter only numbers." },
        custom: {
          isValid: (value) => (value ? value.length > 3 : true),
          message: "Must be at least 4 characters long.",
        },
      },
      street: {
        custom: {
          isValid: (value) => (value ? value.length > 3 : true),
          message: "Must be at least 4 characters long.",
        },
      },
      streetNumber: {
        pattern: { value: /^[0-9]*$/, message: "Enter only numbers." },
      },
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Button classFromProps={classes.ButtonOk} disabled={formState.loading}>
        ok
      </Button>

      <Input
        label="State:"
        placeholder={placeholders.state}
        value={data.state}
        onChange={handleChange("state")}
        error={errors.state}
        type="text"
      />
      <br style={{ marginBottom: "3rem" }} />

      <Input
        label="City:"
        placeholder={placeholders.city}
        value={data.city}
        onChange={handleChange("city")}
        error={errors.city}
        type="text"
      />
      <br style={{ marginBottom: "3rem" }} />

      <Input
        label="Zip Code:"
        placeholder={placeholders.zipCode}
        value={data.zipCode}
        onChange={handleChange("zipCode")}
        error={errors.zipCode}
        type="text"
      />
      <br style={{ marginBottom: "3rem" }} />

      <Input
        label="Street:"
        placeholder={placeholders.street}
        value={data.street}
        onChange={handleChange("street")}
        error={errors.street}
        type="text"
      />
      <br style={{ marginBottom: "3rem" }} />

      <Input
        label="Street Number:"
        placeholder={placeholders.streetNumber}
        value={data.streetNumber}
        onChange={handleChange("streetNumber")}
        error={errors.streetNumber}
        type="text"
      />
      <br style={{ marginBottom: "3rem" }} />
      <p className={classes.Message} style={{ color: "red" }}>
        {formState.loading ? <Spinner /> : formState.message}
      </p>
    </form>
  );
};

export default AddressForm;
