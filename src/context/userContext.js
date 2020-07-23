import React, { useState, useMemo, useCallback } from "react";
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
      loading: false,
      name: null,
      email: null,
      token: null,
    }
  );

  const history = useHistory();

  // Login
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setLoginData((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await login({
      email: email,
      password: password,
    });

    if (response.ok) {
      // if succeed, sets loginData and saves localStorage
      setLoginData({
        loading: false,
        name: response.user.name,
        email: response.user.email,
        token: response.token,
      });
      saveState({
        token: response.token,
        name: response.user.name,
        email: response.user.email,
      });
    } else {
      setLoginData((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }

    return { succeed: response.ok, message: response.message };
  };

  // Logout
  const handleLogout = useCallback(async () => {
    await logout(loginData.token);
    window.localStorage.clear();
    setLoginData({
      loading: false,
      name: null,
      email: null,
      token: null,
    });
    history.push("/");
  }, [history, loginData.token]);

  // Logout All
  const handleLogoutAll = useCallback(async () => {
    setLoginData((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const response = await logoutAll(loginData.token);
    setLoginData((prevState) => ({
      ...prevState,
      loading: false,
    }));

    return { succeed: response.ok, message: response.message };
  }, [loginData.token]);

  // Change Password
  const handleChangePassword = useCallback(
    async (data) => {
      setLoginData((prevState) => ({
        ...prevState,
        loading: true,
      }));
      const response = await changePass(loginData.token, data);
      setLoginData((prevState) => ({
        ...prevState,
        loading: false,
      }));

      return { succeed: response.ok, message: response.message };
    },
    [loginData.token]
  );

  // Forgot Password
  const handleForgotPassword = async (email) => {
    setLoginData((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await forgotPass(email);

    setLoginData((prevState) => ({
      ...prevState,
      loading: false,
    }));
    return { succeed: response.ok, message: response.message };
  };

  // Reset Password
  const handleResetPassword = async (token, password, passwordConfirmation) => {
    setLoginData((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const response = await resetPass({
      resetLink: token,
      password,
      passwordConfirmation,
    });

    setLoginData((prevState) => ({
      ...prevState,
      loading: false,
    }));

    return { succeed: response.ok, message: response.message };
  };

  // stuff context will provide
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
