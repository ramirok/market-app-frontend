import { useState } from "react";

export const useInputData = (type) => {
  const [data, setData] = useState("");

  const value = data;
  const onChange = (e) => {
    setData(e.target.value);
  };

  return { type, value, onChange };
};
