import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  login,
  logout,
  logoutAll,
  changePass,
  forgotPass,
  resetPass,
} from "../utils/fetchServices";
import { saveState, loadState } from "../utils/localStorage";

const UserContext = React.createContext();

export const UserProvider = (props) => {
  // Login data
  const [loginData, setLoginData] = useState(
    loadState() || {
      message: null,
      loading: false,
      userId: null,
      name: null,
      email: null,
      token: null,
    }
  );

  const history = useHistory();

  useEffect(() => {
    if (loginData.message) {
      // When login fails, clears error after 3s
      const timer = setTimeout(() => {
        setLoginData((prevState) => ({ ...prevState, message: null }));
      }, 3000);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [loginData.token, loginData.message]);

  // Login
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setLoginData((prevState) => ({
      ...prevState,
      loading: true,
      message: null,
    }));

    const response = await login({
      email: email,
      password: password,
    });

    if (response.error) {
      // if fails, sets error
      setLoginData((prevState) => ({
        ...prevState,
        message: response.error,
        loading: false,
      }));

      // boolean for redirect
      return false;
    } else {
      // if succeed, sets token and userId and saves localStorage
      setLoginData((prevState) => ({
        ...prevState,
        loading: false,
        userId: response.user.id,
        token: response.token,
        name: response.user.name,
        email: response.user.email,
      }));
      saveState({
        token: response.token,
        userId: response.user.id,
        name: response.user.name,
        email: response.user.email,
      });

      // boolean for redirect
      return true;
    }
  };

  // Logout
  const handleLogout = useCallback(async () => {
    await logout(loginData.token);
    window.localStorage.clear();
    setLoginData({
      message: null,
      loading: false,
      userId: null,
      token: null,
    });
    history.push("/");
  }, [history, loginData.token]);

  // Logout All
  const handleLogoutAll = useCallback(async () => {
    setLoginData((prevState) => ({
      ...prevState,
      loading: true,
      message: null,
    }));
    const response = await logoutAll(loginData.token);
    setLoginData((prevState) => ({
      ...prevState,
      message: response.message,
      loading: false,
    }));
  }, [loginData.token]);

  // Change Password
  const handleChangePassword = useCallback(
    async (data) => {
      setLoginData((prevState) => ({
        ...prevState,
        loading: true,
        message: null,
      }));

      const response = await changePass(loginData.token, data);

      if (response.error) {
        setLoginData((prevState) => ({
          ...prevState,
          message: response.error,
          loading: false,
        }));

        return false;
      } else {
        setLoginData((prevState) => ({
          ...prevState,
          message: response.message,
          loading: false,
        }));

        return true;
      }
    },
    [loginData.token]
  );

  // Forgot Password
  const handleForgotPassword = async (email) => {
    setLoginData((prevState) => ({
      ...prevState,
      loading: true,
      message: null,
    }));

    const response = await forgotPass(email);

    if (response.error) {
      setLoginData((prevState) => ({
        ...prevState,
        message: response.error,
        loading: false,
      }));
    } else {
      setLoginData((prevState) => ({
        ...prevState,
        message: response.message,
        loading: false,
      }));
    }
  };

  // Reset Password
  const handleResetPassword = async (token, newPass) => {
    setLoginData((prevState) => ({
      ...prevState,
      loading: true,
      message: null,
    }));
    const response = await resetPass({ resetLink: token, newPass });

    if (response.error) {
      setLoginData((prevState) => ({
        ...prevState,
        message: response.error,
        loading: false,
      }));

      return false;
    } else {
      setLoginData((prevState) => ({
        ...prevState,
        message: response.message,
        loading: false,
      }));
      return true;
    }
  };

  const value = useMemo(() => {
    return {
      loginData,
      handleLogout,
      handleLogin,
      handleLogoutAll,
      handleChangePassword,
      handleForgotPassword,
      handleResetPassword,
    };
  }, [loginData, handleLogout, handleLogoutAll, handleChangePassword]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserContext");
  }
  return context;
};
