import React, { useState } from "react";

import { useCart } from "../../../../context/cartContext";
import { useUser } from "../../../../context/userContext";
import { capitalizeName } from "../../../../utils/helpers";
import Spinner from "../../Spinner/Spinner";
import classes from "./DropDownItemDiv.module.css";

const DropDownItemDiv = (props) => {
  /*
  Recives:
  -name: item name
  -amount: item amount
  -onClick: onClick handler
  -id: product id
  */
  const { name, amount, onClick, id } = props;

  // customHook for cart context
  const { delProductHandler } = useCart();

  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

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
        onClick={
          // allows onClick when loading = false
          !isLoading
            ? async () => {
                setIsLoading(true);
                await delProductHandler(id, loginData.token);
              }
            : null
        }
        className={classes.Delete}
      >
        {isLoading ? <Spinner small /> : "X"}
      </span>
    </div>
  );
};

export default DropDownItemDiv;
