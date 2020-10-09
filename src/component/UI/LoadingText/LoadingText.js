import React from "react";

import classes from "./LoadingText.module.css";

const LoadingText = (props) => {
  const { style, number } = props;
  return [...Array(number)].map((e, i) => (
    <span className={classes.Loading} style={style} key={i}></span>
  ));
};

export default LoadingText;
