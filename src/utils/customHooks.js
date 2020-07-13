import { useState, useEffect } from "react";

//---------- form input hook ----------

//recives input type, ie:"email, password, text"
export const useInputData = (type) => {
  // input value state
  const [value, setValue] = useState("");

  const onChange = (e) => {
    // set input value en user types in input
    setValue(e.target.value);
  };

  return { type, value, onChange };
};

//---------- click outside component hook ----------

// recives a reference and a callback to be executed
export const useClickOutsideListenerRef = (ref, cb) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // executes callback
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      // cleans event listener after run
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, cb]);

  return ref;
};
