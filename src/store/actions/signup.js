export const signup = (data) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const parsedResponse = await response.json();
    if (parsedResponse.error) {
      dispatch({ type: "SIGNUP_FAIL", error: parsedResponse.error });
    } else {
      dispatch({ type: "SIGNUP_SUCCESS", userId: parsedResponse.userId });
    }
  };
};
