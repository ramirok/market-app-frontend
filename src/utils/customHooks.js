import { useState, useEffect } from "react";

import { checkValidity } from "./helpers";

//---------- form input hook ----------

//recives input type, ie:"email, password, text"
export const useInputData = (type, check = false, newPass) => {
  // input value state
  const [value, setValue] = useState("");

  // input has been typed in
  const [touched, setTouched] = useState(false);

  const onChange = (e) => {
    // set input value en user types in input
    setValue(e.target.value);
    e.target.value < 1 ? setTouched(false) : setTouched(true);
  };

  // validate input when check = true and touched = true
  if (check && touched) {
    const { isValid, error } = checkValidity(value, type, newPass);
    return { type, value, onChange, isValid, error };
  }

  // if no check or no touched
  return { type, value, onChange };
};

//---------- click outside component hook ----------

// recives a reference and a callback to be executed
export const useClickOutsideListenerRef = (ref, cb, run) => {
  useEffect(() => {
    if (run) {
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
    }
  }, [ref, cb, run]);
};
