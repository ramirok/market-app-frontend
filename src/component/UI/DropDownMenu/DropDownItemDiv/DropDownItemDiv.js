import React from "react";
import { useDispatch } from "react-redux";

import { removeItem } from "../../../../store/actions/cart";
import classes from "./DropDownItemDiv.module.css";

const DropDownItemDiv = (props) => {
  const dispatch = useDispatch();

  /*
  Recives:
  -to
  -props.children
  */
  const { name, list } = props;
  return (
    <div className={classes.MenuItem}>
      <span onClick={() => console.log("clicked")} className={classes.Name}>
        {name}
      </span>
      <span className={classes.Number}>{list[name]}</span>
      <span
        onClick={() => {
          dispatch(removeItem(name));
        }}
        className={classes.Delete}
      >
        X
      </span>
    </div>
  );
};

export default DropDownItemDiv;
