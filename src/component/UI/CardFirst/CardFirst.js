import React from "react";

import classes from "./CardFirst.module.css";

const CardFirst = (props) => {
  /*
Recives:
 -props.children
*/
  return <div className={classes.CardContainer}>{props.children}</div>;
};

export default CardFirst;
