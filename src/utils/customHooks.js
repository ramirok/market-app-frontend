import { useState, useEffect, useRef } from "react";

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

//---------- form input hook ----------

export const useForm = (options) => {
  const [data, setData] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (key) => (e) => {
    const value = e.currentTarget.value;
    setData((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        //   REQUIRED
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        // PATTERN
        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        // CUSTOM
        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return { data, setData, handleChange, handleSubmit, errors };
};
