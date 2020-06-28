const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      let exist = false;
      let existIndex;

      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.item.name) {
          exist = true;
          existIndex = i;
        }
      }

      return exist
        ? state.map((item, index) => {
            if (index !== existIndex) {
              return item;
            }
            return { ...item, amount: item.amount + action.amount };
          })
        : state.concat({ ...action.item, amount: action.amount });

    case "REMOVE":
      return state.filter((el) => el.name !== action.item);
    // case "DELETE_ALL":
    //   return {};
    default:
      return state;
  }
};

export default reducer;
