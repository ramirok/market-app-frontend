import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { login, logout } from "../utils/fetchServices";
import { saveState, loadState } from "../utils/localStorage";

const UserContext = React.createContext();

export const UserProvider = (props) => {
  const history = useHistory();

  // Login data
  const [loginData, setLoginData] = useState(
    loadState() || {
      message: null,
      loading: false,
      userId: null,
      token: null,
    }
  );

  useEffect(() => {
    if (loginData.userId) {
      // When login succeeds, redirects to "/"
      saveState({ token: loginData.token, userId: loginData.userId });
      history.push("/");
    } else {
      // When login fails, clears error after 3s
      const timer = setTimeout(() => {
        setLoginData((prevState) => ({ ...prevState, message: null }));
      }, 3000);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [loginData.userId, loginData.token, loginData.message, history]);

  // Login
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setLoginData((prevState) => ({ ...prevState, loading: true }));

    const response = await login({
      email: email,
      password: password,
    });

    response.error
      ? // if fails, sets error
        setLoginData((prevState) => ({
          ...prevState,
          message: response.error,
          loading: false,
        }))
      : // if succeed, sets token and userId
        setLoginData((prevState) => ({
          ...prevState,
          loading: false,
          userId: response.user.id,
          token: response.token,
        }));
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

  const value = useMemo(() => {
    return { loginData, handleLogout, handleLogin };
  }, [loginData, handleLogout]);

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
