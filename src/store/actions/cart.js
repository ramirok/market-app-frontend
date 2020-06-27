export const addItem = (item, amount = 1) => {
  return (dispatch) => {
    dispatch({ type: "ADD", item, amount });
  };
};

export const removeItem = (item) => {
  return (dispatch) => {
    dispatch({ type: "REMOVE", item });
  };
};

export const deleteAll = () => {
  return (dispatch) => {
    dispatch({ type: "DELETE_ALL" });
  };
};
