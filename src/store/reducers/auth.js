const initialState = {
  userId: null,
  error: null,
  loading: false,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, error: null, loading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        error: null,
        loading: false,
      };
    case "LOGIN_FAIL":
      return { ...state, error: action.error, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "LOGOUT":
      return { ...state, userId: null, token: null };
    default:
      return state;
  }
};

export default reducer;
