import React, { useState, useEffect } from "react";

import { capitalizeName } from "../../../utils/helpers";
import { useUser } from "../../../context/userContext";
import Button from "../../Button/Button";
import classes from "./ShoppingCartCard.module.css";

// SVG imports
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";

const ProductCart = (props) => {
  console.log("rendering card");

  const {
    name,
    img,
    description,
    quantity,
    price,
    id,
    delProductHandler,
    addProductHandler,
  } = props;

  useEffect(() => {
    setAmount(quantity);
  }, [quantity]);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(quantity);
  const { loginData } = useUser();

  const handleSubmitOnEnter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newAmount = e.target.userInput.value - quantity;
    await addProductHandler(id, newAmount, loginData.token);
    setIsLoading(false);
  };

  const handleSubmitOnOk = async (value) => {
    setIsLoading(true);
    const newAmount = value - quantity;
    await addProductHandler(id, newAmount, loginData.token);
    setIsLoading(false);
  };

  return (
    <div className={classes.Product}>
      <div style={{ position: "absolute", right: "2rem", top: "2rem" }}>
        {isLoading && (
          <Spinner
            stroke="black"
            strokeWidth="6"
            style={{
              position: "absolute",
              height: "4rem",
              width: "4rem",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
      <div className={classes.ImageContainer}>
        <img src={img} alt={name} className={classes.Image} />
      </div>

      <div className={classes.InfoContainer}>
        {capitalizeName(name)}
        {img.includes("vegetables") || img.includes("fruits")
          ? " x kg"
          : img.includes("spices")
          ? " x 100g"
          : null}
        <p>{description}</p>
      </div>

      <div className={classes.ButtonsContainer}>
        <Button
          text="-"
          classFromProps={classes.ButtonRemove}
          onClick={
            !isLoading
              ? async () => {
                  setIsLoading(true);
                  await addProductHandler(id, -1, loginData.token);
                  setIsLoading(false);
                }
              : null
          }
        />
        <form onSubmit={handleSubmitOnEnter}>
          <input
            type="number"
            name="userInput"
            className={classes.Input}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </form>
        <Button
          text="+"
          classFromProps={classes.ButtonAdd}
          onClick={
            !isLoading
              ? async () => {
                  setIsLoading(true);
                  await addProductHandler(id, 1, loginData.token);
                  setIsLoading(false);
                }
              : null
          }
        />
        {quantity !== amount && (
          <span
            className={classes.ButtonOk}
            onClick={() => handleSubmitOnOk(amount)}
          >
            &#10003;
          </span>
        )}
      </div>

      <div className={classes.Price}>
        <p
          style={{ color: "#888888", fontSize: "1.5rem" }}
        >{`$ ${price} x ${quantity}`}</p>
        <p>$ {(price * quantity).toFixed(2)}</p>
      </div>
      <Button
        text="X"
        classFromProps={classes.ButtonDel}
        onClick={
          !isLoading
            ? async () => {
                setIsLoading(true);
                await delProductHandler(id, loginData.token);
              }
            : null
        }
      />
    </div>
  );
};

export default ProductCart;
