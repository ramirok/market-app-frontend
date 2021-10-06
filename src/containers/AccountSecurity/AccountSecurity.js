import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../context/userContext";
import { fetchService } from "../../utils/fetchServices";
import { capitalizeName } from "../../utils/helpers";
import Button from "../../component/Button/Button";
import Spinner from "../../component/UI/Spinner/Spinner";
import PersonalInfoForm from "../../component/FormContainer/PersonalInfoForm/PersonalInfoForm";
import AddressForm from "../../component/FormContainer/AddressForm/AddressForm";
import LoadingText from "../../component/UI/LoadingText/LoadingText";
import classes from "./AccountSecurity.module.css";

const initialState = {
  info: {},
  address: {},
  message: null,
  succeed: false,
  personalInfoEditable: false,
  addressEditable: false,
  fetchDataAgain: true,
  loadingGradientAnimation: false,
  loadingLogoutSpinner: false,
  loadingFirstRender: true,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "EDIT_PERSONAL_INFO":
      return { ...state, personalInfoEditable: true };
    case "EDIT_ADDRESS":
      return { ...state, addressEditable: true };
    case "SUBMIT_PERSONAL_INFO":
      return {
        ...state,
        personalInfoEditable: false,
        fetchDataAgain: true,
        loadingGradientAnimation: true,
      };
    case "SUBMIT_ADDRESS":
      return {
        ...state,
        addressEditable: false,
        fetchDataAgain: true,
        loadingGradientAnimation: true,
      };

    case "SET_INFO_AND_ADDRESS_DATA":
      return {
        ...state,
        fetchDataAgain: false,
        loadingGradientAnimation: false,
        loadingFirstRender: false,
        info: { ...action.payload.info },
        address: { ...action.payload.address },
      };
    case "TRIGGER_LOGOUT_SPINNER":
      return { ...state, loadingLogoutSpinner: true };
    case "LOGOUT_ALL":
      return { ...state, ...action.payload, loadingLogoutSpinner: false };
    case "CLEAR_MESSAGE":
      return { ...state, succeed: false, message: null };
    default:
      return { ...state };
  }
};

const AccountSecurity = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData, handleLogoutAll } = useUser();

  const history = useHistory();

  useEffect(() => {
    // only performs fetch when state.fetchDataAgain = true
    if (state.fetchDataAgain) {
      if (loginData.token) {
        fetchService({
          method: "get",
          url: "users/user-details",
          token: loginData.token,
        }).then((data) => {
          if (data.addressCompleted === false)
            dispatch({ type: "EDIT_ADDRESS" });

          if (data.infoCompleted === false)
            dispatch({ type: "EDIT_PERSONAL_INFO" });

          dispatch({ type: "SET_INFO_AND_ADDRESS_DATA", payload: data });
        });
      }
    }
  }, [loginData.token, state.fetchDataAgain]);

  useEffect(() => {
    if (state.message) {
      // clears message after 3s
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGE" });
      }, 3000);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [state.message]);

  // user info to render
  const userInfoData = [];
  for (const key in state.info) {
    userInfoData.push(
      <React.Fragment key={key}>
        <div>
          <p>{capitalizeName(key)}:</p>
          <p className={classes.Text}>
            {state.loadingGradientAnimation ? <LoadingText /> : state.info[key]}
          </p>
        </div>
        <br style={{ marginBottom: "3rem" }} />
      </React.Fragment>
    );
  }

  // user address to render
  const userAddressData = [];
  for (const key in state.address) {
    userAddressData.push(
      <React.Fragment key={key}>
        <div>
          <p>{capitalizeName(key)}:</p>
          <p className={classes.Text}>
            {state.loadingGradientAnimation ? (
              <LoadingText />
            ) : (
              state.address[key]
            )}
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
          <div className={classes.FormContainer}>
            {state.loadingFirstRender ? (
              <div style={{ margin: "auto" }}>
                <Spinner />
              </div>
            ) : state.personalInfoEditable ? (
              <PersonalInfoForm
                // sends userInfo as placeholders when editing
                placeholders={{
                  ...state.info,
                }}
                dispatch={dispatch}
              />
            ) : (
              <>
                <Button
                  classFromProps={classes.ButtonEdit}
                  inverted={true}
                  onClick={() => dispatch({ type: "EDIT_PERSONAL_INFO" })}
                >
                  edit
                </Button>

                {userInfoData}
                <div>
                  <p>Email:</p>
                  <p className={classes.Text}>
                    {state.loadingGradientAnimation ? (
                      <LoadingText />
                    ) : (
                      loginData.email
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* address section */}
        <div className={classes.Section}>
          <h3 className={classes.Title}>Address Data</h3>
          <div className={classes.FormContainer}>
            {state.loadingFirstRender ? (
              <div style={{ margin: "auto" }}>
                <Spinner />
              </div>
            ) : state.addressEditable ? (
              <AddressForm
                // sends userInfo as placeholders when editing
                placeholders={{
                  ...state.address,
                }}
                dispatch={dispatch}
              />
            ) : (
              <>
                <Button
                  classFromProps={classes.ButtonEdit}
                  inverted={true}
                  onClick={() => dispatch({ type: "EDIT_ADDRESS" })}
                >
                  edit
                </Button>
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
            <div style={{ height: "min-content" }}>
              <Button
                classFromProps={classes.Button}
                onClick={async () => {
                  dispatch({ type: "TRIGGER_LOGOUT_SPINNER" });
                  const response = await handleLogoutAll();
                  dispatch({
                    type: "LOGOUT_ALL",
                    payload: {
                      message: response.message,
                      succeed: response.succeed,
                    },
                  });
                }}
                disabled={state.loadingLogoutSpinner}
              >
                Logout from other devices
              </Button>

              {/* message */}
              <p
                className={classes.Message}
                style={{ color: state.succeed ? "green" : "red" }}
              >
                {state.loadingLogoutSpinner ? <Spinner /> : state.message}
              </p>
            </div>

            {/* show changePass form button */}
            <Button
              classFromProps={classes.Button}
              onClick={() => {
                history.push("/app/security/change");
              }}
            >
              Change password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSecurity;
