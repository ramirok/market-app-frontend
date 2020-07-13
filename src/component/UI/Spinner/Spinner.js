import React from "react";

import classes from "./Spinner.module.css";

const Spinner = (props) => {
  const { color } = props;

  let classToApply;
  if (color === "black") {
    classToApply = classes.lds_ring_Black;
  } else if (color === "white") {
    classToApply = classes.lds_ring_White;
  }

  return (
    <div className={classToApply}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
