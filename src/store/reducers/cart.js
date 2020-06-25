const reducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD":
      const newItem = { ...state };

      newItem[action.item] = (newItem[action.item] || 0) + 1;

      return { ...newItem };

    case "REMOVE":
      const removed = { ...state };

      delete removed[action.item];

      return { ...removed };
    case "DELETE_ALL":
      return {};
    default:
      return { ...state };
  }
};

export default reducer;
