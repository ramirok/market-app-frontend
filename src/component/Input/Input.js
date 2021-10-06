import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  /*
Recives:
 -tpye: input type
 -label : input label text
 -isValid: validation checked
 -error: array of validation errors
 -rest: input value and onChange handler
*/
  const { type, label, isValid, error, ...rest } = props;

  // add validation style if recives isValid prop
  let check = {};
  if (isValid === true) {
    check = { borderBottom: "2px solid blue" };
  } else if (isValid === false) {
    check = { borderBottom: "2px solid red" };
  }

  switch (type) {
    case "email":
      return (
        <div className={classes.InputContainer}>
          <label htmlFor="email">{label}</label>
          <input
            {...rest} //input value and onChange atributes
            type={type}
            id="email"
            className={classes.Input}
            style={check}
          />
          {/* if isValid = false, shows (!) with tooltip */}
          {/* {isValid === false && (
            <div className={classes.Tooltip}>
              !<span className={classes.TooltipText}>{error.join(".\n")}</span>
            </div>
          )} */}

          {error && (
            <div className={classes.Tooltip}>
              !<span className={classes.TooltipText}>{error}</span>
            </div>
          )}
        </div>
      );

    case "number":
      return (
        <div className={classes.InputContainer}>
          <label htmlFor={label}>{label}</label>
          <input
            {...rest} //input value and onChange atributes
            type={"text"}
            id={label}
            className={classes.Input}
            style={check}
          />
          {/* if isValid = false, shows (!) with tooltip */}
          {isValid === false && (
            <div className={classes.Tooltip}>
              !<span className={classes.TooltipText}>{error.join(".\n")}</span>
            </div>
          )}
        </div>
      );

    case "password":
      return (
        <div className={classes.InputContainer}>
          <label htmlFor={label}>{label}</label>
          <input
            {...rest} //input value and onChange atributes
            type={type}
            id={label}
            className={classes.Input}
            style={check}
          />
          {/* if isValid = false, shows (!) with tooltip */}
          {error && (
            <div className={classes.Tooltip}>
              !<span className={classes.TooltipText}>{error}</span>
            </div>
          )}
          {/* {isValid === false && (
            <div className={classes.Tooltip}>
              !<span className={classes.TooltipText}>{error.join(".\n")}</span>
            </div>
          )} */}
        </div>
      );

    default:
      //Input type text
      return (
        <div className={classes.InputContainer}>
          <label htmlFor={label}>{label}</label>
          <input
            type="text"
            {...rest} //input value and onChange atributes
            id={label}
            className={classes.Input}
            style={check}
          />
          {/* if isValid = false, shows (!) with tooltip */}
          {/* {isValid === false && (
            <div className={classes.Tooltip}>
              !<span className={classes.TooltipText}>{error.join(".\n")}</span>
            </div>
          )} */}
          {error && (
            <div className={classes.Tooltip}>
              !<span className={classes.TooltipText}>{error}</span>
            </div>
          )}
        </div>
      );
  }
};

export default Input;
