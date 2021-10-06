import React, { useState } from "react";

import { useForm } from "../../../utils/customHooks";
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

  const submitPersonalData = async () => {
    setFormState((prev) => ({ ...prev, loading: true }));

    const response = await fetchService({
      method: "put",
      url: "users/user-details",
      token: loginData.token,
      body: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
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

  const { handleSubmit, handleChange, data, errors } = useForm({
    onSubmit: submitPersonalData,

    initialValues: {
      fullName: "",
      phoneNumber: "",
    },

    validations: {
      fullName: {
        pattern: {
          value: /^[a-z ,.'-]*$/i,
          message: "Only letters and ,.'-",
        },
        custom: {
          isValid: (value) => (value ? value.length > 3 : true),
          message: "Must have a least 4 characters",
        },
      },
      phoneNumber: {
        pattern: {
          value: /^[0-9\s+\-().]*$/,
          message: "Only numbers and ()-.+",
        },
      },
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Button classFromProps={classes.ButtonOk} disabled={formState.loading}>
        ok
      </Button>
      <Input
        label="Full Name:"
        placeholder={placeholders.fullName}
        error={errors.fullName}
        value={data.fullName}
        onChange={handleChange("fullName")}
      />
      <br style={{ marginBottom: "3rem" }} />

      <Input
        label="Phone Number:"
        placeholder={placeholders.phoneNumber}
        error={errors.phoneNumber}
        value={data.phoneNumber}
        onChange={handleChange("phoneNumber")}
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
