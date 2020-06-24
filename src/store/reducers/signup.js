const initialState = { error: null, loading: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_FAIL":
      const error = action.error.includes("duplicate key error")
        ? "Email already exist"
        : action.error;

      return { ...state, error };
    case "SIGNUP_SUCCESS":
      return { ...state, error: null };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export default reducer;
