import { jwtDecode } from "./helpers";

// --------- Saves localStorage ----------
export const saveState = (state) => {
  try {
    localStorage.setItem("NewState", JSON.stringify(state));
  } catch (error) {
    return undefined;
  }
};

// --------- Loads localStorage ----------
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("NewState");
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    const decodedData = jwtDecode(parsedState.token);
    return {
      token: parsedState.token,
      name: decodedData.name,
      email: decodedData.email,
    };
  } catch (error) {
    return undefined;
  }
};
