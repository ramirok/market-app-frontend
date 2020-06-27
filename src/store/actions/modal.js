export const showModal = (item) => {
  return (dispatch) => {
    dispatch({ type: "SHOW", item });
  };
};
