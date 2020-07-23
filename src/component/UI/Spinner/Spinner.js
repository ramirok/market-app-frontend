import React from "react";

import { ReactComponent as SpinnerSvg } from "../../../assets/spinner.svg";

const Spinner = (props) => {
  /*
Recives:
 -white: white spinner
 -small: small spinner
*/
  const { white, small } = props;

  return (
    <SpinnerSvg
      stroke={white ? "white" : "black"}
      style={
        small
          ? {
              height: "2rem",
              width: "2rem",
            }
          : null
      }
    />
  );
};

export default Spinner;
