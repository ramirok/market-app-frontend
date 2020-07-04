import React from "react";

import { useCart } from "../../../../context/cartContext";
import { useUser } from "../../../../context/userContext";
import { capitalizeName } from "../../../../utils/helpers";
import classes from "./DropDownItemDiv.module.css";

const DropDownItemDiv = (props) => {
  const { delProductHandler } = useCart();
  const { loginData } = useUser();
  /*
  Recives:
  -name: item name
  -amount: item amount
  -onClick: onClick handler
  */
  const { name, amount, onClick } = props;
  return (
    <div className={classes.MenuItem}>
      {/* Product name */}
      <span onClick={onClick} className={classes.Name}>
        {capitalizeName(name)}
      </span>

      {/* Product amount */}
      <span className={classes.Number}>{amount}</span>

      {/* Delete product button */}
      <span
        onClick={() => delProductHandler(name, loginData.token)}
        className={classes.Delete}
      >
        X
      </span>
    </div>
  );
};

export default DropDownItemDiv;
