export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("logged");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToSave = { ...state };
    delete stateToSave.modal;
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("logged", serializedState);
  } catch (error) {}
};
