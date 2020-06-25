export const addItem = (item) => {
  return (dispatch) => {
    dispatch({ type: "ADD", item });
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
