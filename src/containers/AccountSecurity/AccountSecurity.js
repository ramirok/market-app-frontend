import React, { useState } from "react";

import { useUser } from "../../context/userContext";
import { capitalizeName } from "../../utils/helpers";
import Button from "../../component/Button/Button";
import ChangePassForm from "./ChangePassForm/ChangePassForm";
import classes from "./AccountSecurity.module.css";

// SVG imports
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

const AccountSecurity = () => {
  const { loginData, handleLogoutAll } = useUser();

  const [changePass, setChangePass] = useState(false);

  const changePassword = () => {
    setChangePass(true);
  };

  return (
    <>
      <div className={classes.Head}></div>

      <div className={classes.Container}>
        <div className={classes.Section}>
          <div className={classes.InfoContainer}>
            <p>{`Hi, ${capitalizeName(loginData.name)}`}</p>
            <div>
              <p>Email:</p>
              <p>{loginData.email}</p>
            </div>
          </div>
          {changePass ? (
            <ChangePassForm setChangePass={setChangePass} />
          ) : (
            <div className={classes.ButtonsContainer}>
              {!changePass && (
                <Button
                  text="Logout from other devices"
                  classFromProps={classes.Button}
                  onClick={handleLogoutAll}
                />
              )}
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

              <Button
                text="Change password"
                classFromProps={classes.Button}
                onClick={changePassword}
              />
            </div>
          )}
        </div>
        <div className={classes.Section}>personal info</div>
      </div>
    </>
  );
};

export default AccountSecurity;
