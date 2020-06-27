import React from "react";
import { useDispatch } from "react-redux";

import { capitalizeName } from "../../../../utils/helpers";
import { removeItem } from "../../../../store/actions/cart";
import classes from "./DropDownItemDiv.module.css";

const DropDownItemDiv = (props) => {
  const dispatch = useDispatch();

  /*
  Recives:
  -to
  -props.children
  */
  const { name, amount, onClick } = props;
  return (
    <div className={classes.MenuItem}>
      <span onClick={onClick} className={classes.Name}>
        {capitalizeName(name)}
      </span>
      <span className={classes.Number}>{amount}</span>
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
