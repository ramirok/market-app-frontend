import React, { useState, useEffect } from "react";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
import Button from "../../../component/Button/Button";
import Input from "../../../component/Input/Input";
import Spinner from "../../../component/UI/Spinner/Spinner";
import classes from "./ChangePassForm.module.css";

const ChangePassForm = (props) => {
  /*
Recives:
 -setChangePass: state for showing changePass form
*/
  const { setChangePass } = props;

  // customHook for user context:
  // loginData returns ={message, loading, token}
  const { loginData, handleChangePassword } = useUser();

  // customHook useInputData returns: type, value, onChange handler, isValid and validation errors
  const currentPass = useInputData("password");
  const password = useInputData("password", true); //second argument true for validation
  const passwordConfirmation = useInputData("password", true, password.value); //second argument true for validation

  // message state from fetch response
  const [message, setMessage] = useState(null);

  // password change succeed
  const [succeed, setSucceed] = useState(false);

  useEffect(() => {
    if (message) {
      // clears message after 3s
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <div className={classes.FormContainer}>
      <Input {...currentPass} label="Current password." />
      <Input {...password} label="New password." />
      <Input {...passwordConfirmation} label="Repeat new password." />

      {/* message */}
      <p
        className={classes.Message}
        style={{ color: succeed ? "green" : "red" }}
      >
        {loginData.loading ? <Spinner /> : message}
      </p>

      <div className={classes.ButtonsContainer}>
        {/* show change password button if succeed = false */}
        {!succeed && (
          <Button
            text="Change password"
            classFromProps={
              passwordConfirmation.isValid && currentPass.value
                ? classes.ButtonChange
                : classes.ButtonDisabled
            }
            onClick={
              // allows onClick if passwordConfirmation is valid and currentPass has a value
              passwordConfirmation.isValid && currentPass.value
                ? async () => {
                    const response = await handleChangePassword({
                      currentPass: currentPass.value,
                      password: password.value,
                      passwordConfirmation: passwordConfirmation.value,
                    });
                    setSucceed(response.succeed);
                    setMessage(response.message);
                  }
                : null
            }
          />
        )}

        <Button
          text={succeed ? "Go back" : "Cancel"}
          classFromProps={classes.ButtonCancel}
          onClick={() => setChangePass(false)}
        />
      </div>
    </div>
  );
};

export default ChangePassForm;
