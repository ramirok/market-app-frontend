// const initialState = { item1: 2, item2: 6, item5: 3 };

const reducer = (state = { "Cart is empty": "X" }, action) => {
  switch (action.type) {
    case "ADD":
      const newItem = { ...state };

      newItem[action.item] = (newItem[action.item] || 0) + 1;

      return { ...newItem };

    case "REMOVE":
      return { ...state };

    default:
      return { ...state };
  }
};

export default reducer;
