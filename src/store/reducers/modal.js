const initialState = {
  show: false,
  img: "",
  name: "",
  price: "",
  description: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        show: true,
        img: action.img,
        name: action.name,
        price: action.price,
        description: action.description,
      };
    case "HIDE":
      return { ...state, show: false };

    default:
      return { ...state, show: false };
  }
};

export default reducer;
