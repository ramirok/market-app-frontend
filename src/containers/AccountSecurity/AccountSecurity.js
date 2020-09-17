import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../context/userContext";
import { getUserDetails } from "../../utils/fetchServices";
import { capitalizeName } from "../../utils/helpers";
import Button from "../../component/Button/Button";
import Spinner from "../../component/UI/Spinner/Spinner";
import PersonalInfoForm from "../../component/FormContainer/PersonalInfoForm/PersonalInfoForm";
import AddressForm from "../../component/FormContainer/AddressForm/AddressForm";
import LoadingText from "../../component/UI/LoadingText/LoadingText";
import classes from "./AccountSecurity.module.css";

const AccountSecurity = () => {
  // customHook for user context:
  // loginData returns ={loading, token}
  const { loginData, handleLogoutAll } = useUser();

  // succeed and message state for logout all
  const [securityState, setSecurityState] = useState({
    succeed: false,
    message: null,
    loading: false,
  });

  // edit info state
  const [editable, setEditable] = useState({
    personalInfo: false,
    address: false,
    newFetch: true,
    loading: false,
  });

  // user info state
  const [userInfo, setUserInfo] = useState({ info: {}, address: {} });

  const history = useHistory();

  useEffect(() => {
    // only performs fetch when editable.newFetch = true
    if (editable.newFetch) {
      // set loading = true
      setEditable((prev) => ({ ...prev, loading: true }));

      // fetch user details and set userInfo, and editable state
      getUserDetails(loginData.token).then((data) => {
        setUserInfo({ info: data.info, address: data.address });
        setEditable({
          newFetch: false,
          personalInfo: !data.infoCompleted,
          address: !data.addressCompleted,
          loading: false,
        });
      });
    }
  }, [loginData.token, editable.newFetch]);

  useEffect(() => {
    if (securityState.message) {
      // clears message after 3s
      const timer = setTimeout(() => {
        // setMessage(null);
        setSecurityState({ succeed: false, message: null });
      }, 3000);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [securityState.message]);

  // user info to render
  const userInfoData = [];
  for (const key in userInfo.info) {
    userInfoData.push(
      <React.Fragment key={key}>
        <div>
          <p>{capitalizeName(key)}:</p>
          <p className={classes.Text}>
            {editable.loading ? <LoadingText /> : userInfo.info[key]}
          </p>
        </div>
        <br style={{ marginBottom: "3rem" }} />
      </React.Fragment>
    );
  }

  // user address to render
  const userAddressData = [];
  for (const key in userInfo.address) {
    userAddressData.push(
      <React.Fragment key={key}>
        <div>
          <p>{capitalizeName(key)}:</p>
          <p className={classes.Text}>
            {editable.loading ? <LoadingText /> : userInfo.address[key]}
          </p>
        </div>
        <br style={{ marginBottom: "3rem" }} />
      </React.Fragment>
    );
  }

  return (
    <>
      <div className={classes.Head}></div>

      <div className={classes.Container}>
        {/* personal info section */}
        <div className={classes.Section}>
          <h3 className={classes.Title}>Personal Data</h3>
          <div className={classes.PersonalInfoContainer}>
            {editable.personalInfo ? (
              <PersonalInfoForm
                // sends userInfo as placeholders when editing
                placeholders={{
                  ...userInfo.info,
                }}
                setEditable={setEditable}
              />
            ) : (
              <>
                <Button
                  text="edit"
                  classFromProps={classes.ButtonEdit}
                  onClick={() => {
                    // shows personalInfo form
                    setEditable((prev) => ({
                      ...prev,
                      personalInfo: true,
                    }));
                  }}
                />

                {userInfoData}
                <div>
                  <p>Email:</p>
                  <p className={classes.Text}>
                    {editable.loading ? <LoadingText /> : loginData.email}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* address info section */}
        <div className={classes.Section}>
          <h3 className={classes.Title}>Address Data</h3>
          <div className={classes.AddressContainer}>
            {editable.address ? (
              <AddressForm
                // sends userInfo as placeholders when editing
                placeholders={{
                  ...userInfo.address,
                }}
                setEditable={setEditable}
              />
            ) : (
              <>
                <Button
                  text="edit"
                  classFromProps={classes.ButtonEdit}
                  onClick={() => {
                    // shows address form
                    setEditable((prev) => ({
                      ...prev,
                      address: true,
                    }));
                  }}
                />
                {userAddressData}
                <span style={{ marginBottom: "3.5rem" }} />
              </>
            )}
          </div>
        </div>

        {/* security section */}
        <div className={classes.Section}>
          <h3 className={classes.Title}>Security</h3>
          {/* buttons container */}
          <div className={classes.ButtonsContainer}>
            {/* logoutAll button */}
            <div>
              <Button
                text="Logout from other devices"
                classFromProps={classes.Button}
                onClick={
                  // alows onClick when loading = false
                  !securityState.loading
                    ? async () => {
                        setSecurityState((prev) => ({
                          ...prev,
                          loading: true,
                        }));
                        const response = await handleLogoutAll();
                        setSecurityState({
                          succeed: response.succeed,
                          message: response.message,
                          loading: false,
                        });
                      }
                    : null
                }
              />

              {/* message */}
              <p
                className={classes.Message}
                style={{ color: securityState.succeed ? "green" : "red" }}
              >
                {securityState.loading ? <Spinner /> : securityState.message}
              </p>
            </div>

            {/* show changePass form button */}
            <Button
              text="Change password"
              classFromProps={classes.Button}
              onClick={() => {
                history.push("/app/security/change");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSecurity;
