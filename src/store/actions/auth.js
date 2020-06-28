export const login = (data) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_START" });
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const parsedResponse = await response.json();

    if (parsedResponse.error) {
      dispatch({ type: "LOGIN_FAIL", error: parsedResponse.error });
    } else {
      dispatch({
        type: "LOGIN_SUCCESS",
        userId: parsedResponse.userId,
        token: parsedResponse.token,
      });
    }
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_ERROR" });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };
};
