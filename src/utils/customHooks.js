import { useState, useEffect, useRef } from "react";

import { checkValidity } from "./helpers";

//---------- form input hook ----------

// //recives input type, ie:"email, password, text"
export const useInputData = (
  options = { type: "text", validate: false, confirmPass: "" }
) => {
  // input value state
  const [value, setValue] = useState("");

  // input has been typed in
  const [touched, setTouched] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
    e.target.value < 1 ? setTouched(false) : setTouched(true);
  };

  // validate input when validate = true and touched = true
  if (options.validate && touched) {
    const { isValid, error } = checkValidity(
      value,
      options.type,
      options.confirmPass
    );
    return { type: options.type, value, onChange, isValid, error };
  }

  // if no validate or no touched
  return { type: options.type, value, onChange };
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

//---------- check what triggers rerender ----------

export const useTraceUpdate = (props) => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:", changedProps);
    }
    prev.current = props;
  });
};

//---------- track window resize----------

export const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    setWindowWidth(windowWidth);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return windowWidth;
};
