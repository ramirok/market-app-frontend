import React, { useState, useEffect } from "react";

import { useUser } from "../../context/userContext";
import { capitalizeName } from "../../utils/helpers";
import Button from "../../component/Button/Button";
import ChangePassForm from "./ChangePassForm/ChangePassForm";
import Spinner from "../../component/UI/Spinner/Spinner";
import classes from "./AccountSecurity.module.css";

const AccountSecurity = () => {
  // customHook for user context:
  // loginData returns ={message, loading, token}
  const { loginData, handleLogoutAll } = useUser();

  // message state from fetch response
  const [message, setMessage] = useState(null);

  // state for showing changePass form
  const [changePass, setChangePass] = useState(false);

  // logoutAll succeed
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
    <>
      <div className={classes.Head}></div>

      <div className={classes.Container}>
        {/* security section */}
        <div className={classes.Section}>
          {/* info container */}
          <div className={classes.InfoContainer}>
            <p>{`Hi, ${capitalizeName(loginData.name)}`}</p>
            <div>
              <p>Email:</p>
              <p>{loginData.email}</p>
            </div>
          </div>

          {/* if changePass = true, shows changePass form */}
          {changePass ? (
            <ChangePassForm setChangePass={setChangePass} />
          ) : (
            <div className={classes.ButtonsContainer}>
              {/* logoutAll button */}
              <Button
                text="Logout from other devices"
                classFromProps={classes.Button}
                onClick={
                  // alows onClick when loading = false
                  !loginData.loading
                    ? async () => {
                        const response = await handleLogoutAll();
                        setSucceed(response.succeed);
                        setMessage(response.message);
                      }
                    : null
                }
              />

              {/* message */}
              <p
                className={classes.Message}
                style={{ color: succeed ? "green" : "red" }}
              >
                {loginData.loading ? <Spinner /> : message}
              </p>

              {/* show changePass form button */}
              <Button
                text="Change password"
                classFromProps={classes.Button}
                onClick={() => setChangePass(true)}
              />
            </div>
          )}
        </div>

        {/* personal info section */}
        <div className={classes.Section}>personal info</div>
      </div>
    </>
  );
};

export default AccountSecurity;
