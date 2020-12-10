import React, { useState, useEffect } from "react";

import { capitalizeName } from "../../../../utils/helpers";
import { useUser } from "../../../../context/userContext";
import Button from "../../../Button/Button";
import Spinner from "../../Spinner/Spinner";
import classes from "./CartCard.module.css";

const CartCard = (props) => {
  /*
Recives:
 -name: product name
 -img: img url
 -description: product description
 -price: product price
 -id: product id
 -quantity: product quantity retrived from the cart
 -addProductHandler: add product to the cart
 -delProductHandler: remove product from the cart
*/
  const {
    name,
    img,
    description,
    price,
    id,
    quantity,
    addProductHandler,
    delProductHandler,
  } = props;

  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // loading state for spinner
  const [isLoading, setIsLoading] = useState(false);

  // amount state for fetch
  const [amount, setAmount] = useState(quantity);

  useEffect(() => {
    // set amount to quantity retrived from the cart
    setAmount(quantity);
  }, [quantity]);

  const handleSubmitOnEnter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newAmount = e.target.userInput.value - quantity;
    // if user input <= 0, delete product from cart
    parseInt(e.target.userInput.value) <= 0
      ? await delProductHandler(id, loginData.token)
      : await addProductHandler(id, newAmount, loginData.token);
    setIsLoading(false);
  };

  const handleSubmitOnOk = async (value) => {
    setIsLoading(true);
    const newAmount = value - quantity;
    // if user input <= 0, delete product from cart
    parseInt(value) <= 0
      ? await delProductHandler(id, loginData.token)
      : await addProductHandler(id, newAmount, loginData.token);
    setIsLoading(false);
  };

  return (
    <div className={classes.Container}>
      {/* show spinner if isLoading = true */}
      <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
        {isLoading && <Spinner small={true} />}
      </div>

      <div style={{ display: "flex", flexGrow: "1" }}>
        {/* product image */}
        <div className={classes.ImageContainer}>
          <img src={`/${img}`} alt={name} className={classes.Image} />
        </div>

        {/* product info */}
        <div className={classes.InfoContainer}>
          {capitalizeName(name)}
          {img.includes("vegetables") || img.includes("fruits")
            ? " x kg"
            : img.includes("spices")
            ? " x 100g"
            : null}
          <p>{description}</p>
        </div>
      </div>

      {/* buttons and input */}
      <div className={classes.ButtonsContainer}>
        <Button
          classFromProps={classes.ButtonRemove}
          onClick={
            // allows onClick if isLoading = false
            quantity > 1
              ? async () => {
                  setIsLoading(true);
                  await addProductHandler(id, -1, loginData.token);
                  setIsLoading(false);
                }
              : async () => {
                  setIsLoading(true);
                  await delProductHandler(id, loginData.token);
                }
          }
          disabled={isLoading}
        >
          -
        </Button>

        <form onSubmit={handleSubmitOnEnter}>
          <input
            type="number"
            name="userInput"
            min="0"
            className={classes.Input}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </form>

        <Button
          classFromProps={classes.ButtonAdd}
          onClick={
            // allows onClick if isLoading = false

            async () => {
              setIsLoading(true);
              await addProductHandler(id, 1, loginData.token);
              setIsLoading(false);
            }
          }
          disabled={isLoading}
        >
          +
        </Button>

        {/* if user inputs value (amount), show ok button to fetch new quantity  */}
        {quantity !== amount && (
          <span
            className={classes.ButtonOk}
            onClick={() => handleSubmitOnOk(amount)}
          >
            &#10003;
          </span>
        )}
      </div>

      <div className={classes.PriceAndDelete}>
        {/* price */}
        <div className={classes.Price}>
          <p
            style={{ color: "#888888", fontSize: "1.5rem" }}
          >{`$ ${price} x ${quantity}`}</p>
          <p>$ {(price * quantity).toFixed(2)}</p>
        </div>

        {/* remove product button */}
        <Button
          classFromProps={classes.ButtonDel}
          onClick={
            // allows onClick if isLoading = false
            async () => {
              setIsLoading(true);
              await delProductHandler(id, loginData.token);
            }
          }
          disabled={isLoading}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
