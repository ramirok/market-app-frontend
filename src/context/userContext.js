import React, { useMemo, useCallback, useReducer } from "react";
import { useHistory } from "react-router-dom";

import { fetchService } from "../utils/fetchServices";
import { saveState, loadState } from "../utils/localStorage";

import { jwtDecode } from "../utils/helpers";

const UserContext = React.createContext();

const initialState = loadState() || {
  loading: false,
  name: null,
  email: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TRIGGER_LOADING":
      return { ...state, loading: !state.loading };
    case "SET_LOGIN_DATA":
      return { ...state, loading: false, ...action.payload };
    default:
      return { ...state };
  }
};

export const UserProvider = (props) => {
  const [loginData, dispatch] = useReducer(reducer, initialState);

  const history = useHistory();

  // Login
  const handleLogin = async (email, password) => {
    dispatch({ type: "TRIGGER_LOADING" });

    const response = await fetchService("post", "users/login", null, {
      email: email,
      password: password,
    });

    if (response.ok) {
      // if succeed, sets loginData and saves to localStorage

      const decodedToken = jwtDecode(response.token);
      dispatch({
        type: "SET_LOGIN_DATA",
        payload: {
          name: decodedToken.name,
          email: decodedToken.email,
          token: response.token,
        },
      });

      saveState({
        token: response.token,
      });
    } else {
      dispatch({ type: "TRIGGER_LOADING" });
    }

    return { succeed: response.ok, message: response.message };
  };

  // Login Google
  const handleLoginGoogle = useCallback(async (code) => {
    dispatch({ type: "TRIGGER_LOADING" });

    const response = await fetchService("get", `users/login/google${code}`);

    if (response.ok) {
      // if succeed, sets loginData and saves localStorage

      const decodedToken = jwtDecode(response.token);
      dispatch({
        type: "SET_LOGIN_DATA",
        payload: {
          name: decodedToken.name,
          email: decodedToken.email,
          token: response.token,
        },
      });

      saveState({
        token: response.token,
      });
    } else {
      dispatch({ type: "TRIGGER_LOADING" });
    }

    return { succeed: response.ok, message: response.message };
  }, []);

  // Logout
  const handleLogout = useCallback(async () => {
    // await fetchService("post", "users/logout", loginData.token);
    await fetchService("post", "users/logout", loginData.token);

    window.localStorage.clear();
    dispatch({
      type: "SET_LOGIN_DATA",
      payload: {
        name: null,
        email: null,
        token: null,
      },
    });

    history.push("/");
  }, [history, loginData.token]);

  // Logout All
  const handleLogoutAll = useCallback(async () => {
    const response = await fetchService(
      "post",
      "users/logoutAll",
      loginData.token
    );
    return { succeed: response.ok, message: response.message };
  }, [loginData.token]);

  // Change Password
  const handleChangePassword = useCallback(
    async (data) => {
      dispatch({ type: "TRIGGER_LOADING" });

      const response = await fetchService(
        "put",
        "users/change",
        loginData.token,
        data
      );

      dispatch({ type: "TRIGGER_LOADING" });

      return { succeed: response.ok, message: response.message };
    },
    [loginData.token]
  );

  // Forgot Password
  const handleForgotPassword = async (email) => {
    dispatch({ type: "TRIGGER_LOADING" });

    const response = await fetchService("post", "users/forgot-pass", null, {
      email,
    });

    dispatch({ type: "TRIGGER_LOADING" });
    return { succeed: response.ok, message: response.message };
  };

  // Reset Password
  const handleResetPassword = async (token, password, passwordConfirmation) => {
    dispatch({ type: "TRIGGER_LOADING" });

    const response = await fetchService("put", "users/reset-pass", null, {
      resetLink: token,
      password,
      passwordConfirmation,
    });

    dispatch({ type: "TRIGGER_LOADING" });

    return { succeed: response.ok, message: response.message };
  };

  // stuff context will provide
  const value = useMemo(() => {
    return {
      loginData,
      handleLogout,
      handleLogin,
      handleLoginGoogle,
      handleLogoutAll,
      handleChangePassword,
      handleForgotPassword,
      handleResetPassword,
    };
  }, [
    loginData,
    handleLoginGoogle,
    handleLogout,
    handleLogoutAll,
    handleChangePassword,
  ]);

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
