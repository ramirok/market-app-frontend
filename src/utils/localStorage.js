export const saveState = (state) => {
  try {
    localStorage.setItem("NewState", JSON.stringify(state));
  } catch (error) {
    console.log(error);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("NewState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
