export const addItem = (item) => {
  return (dispatch) => {
    dispatch({ type: "ADD", item });
  };
};

export const removeItem = (item) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE" });
  };
};
