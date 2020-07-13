import React, { useState } from "react";

import { useUser } from "../../../context/userContext";
import { useInputData } from "../../../utils/customHooks";
import Button from "../../../component/Button/Button";
import Input from "../../../component/Input/Input";
import classes from "./ChangePassForm.module.css";

// SVG imports
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";

const ChangePassForm = (props) => {
  const { setChangePass } = props;
  const { loginData, handleChangePassword } = useUser();

  const oldPass = useInputData("password");
  const newPass = useInputData("password");
  const newPassRepeat = useInputData("password");

  const [succeed, setSucceed] = useState(false);

  return (
    <div className={classes.FormContainer}>
      <Input {...oldPass} label="Enter your current password." />
      <Input {...newPass} label="Enter your new password." />
      <Input {...newPassRepeat} label="Enter your new password." />
      {loginData.loading ? (
        <p className={classes.Message}>
          <Spinner
            stroke="black"
            strokeWidth="5"
            style={{
              display: "block",
              margin: "auto",
              height: "3.5rem",
              width: "3.5rem",
            }}
          />
        </p>
      ) : loginData.message ? (
        <p className={classes.Message}>{loginData.message}</p>
      ) : (
        <p className={classes.Message}>&nbsp;</p>
      )}
      <div className={classes.ButtonsContainer}>
        {!succeed && (
          <Button
            text="Change password"
            classFromProps={classes.ButtonChange}
            onClick={async () => {
              (await handleChangePassword({
                currentPass: oldPass.value,
                newPass: newPassRepeat.value,
              })) && setSucceed(true);
            }}
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
