import React, { useState } from "react";

import { useUser } from "../../../../context/userContext";
import { useCart } from "../../../../context/cartContext";
import { capitalizeName } from "../../../../utils/helpers";
import Modal from "../Modal";
import Button from "../../../Button/Button";

import classes from "./ProductModal.module.css";

// SVG imports
import { ReactComponent as Spinner } from "../../../../assets/spinner.svg";

const ProductModal = (props) => {
  /*
Recives:
 -isOpen: modal open/close state
 -setIsOpen: changes isOpen state
 -item: item to fetch
 -props.children
*/
  const { isOpen, setIsOpen, modalData } = props;

  // customHook for user context:
  // loginData returns ={message, loading, userId, token}
  const { loginData } = useUser();

  // customHook for cart context
  const { addProductHandler } = useCart();

  // product amount to add to cart
  const [amount, setAmount] = useState(0);

  // isLoading state for spinner
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {/* Image Container */}
      <div className={classes.ImageContainer}>
        <img
          src={modalData.img}
          alt={modalData.name}
          className={classes.Image}
        />
      </div>

      {/* Info Container */}
      <div className={classes.Info}>
        <h3>{capitalizeName(modalData.name)}</h3>
        <p>
          {capitalizeName(modalData.description)}
          {modalData.img.includes("vegetables") ||
          modalData.img.includes("fruits")
            ? " x kg"
            : modalData.img.includes("spices")
            ? " x 100g"
            : null}
        </p>

        <h4 className={classes.Price}>{`Unit price $ ${modalData.price}`}</h4>
        <div>
          <p>
            Amount <span>{amount}</span>
          </p>
          <p>Total {`$ ${(amount * modalData.price).toFixed(2)}`}</p>
        </div>
        <div className={classes.ButtonsContainer}>
          <Button
            text="-"
            classFromProps={classes.ButtonRemove}
            onClick={() => {
              setAmount(amount ? amount - 1 : 0);
            }}
          />
          <Button
            text="+"
            classFromProps={classes.ButtonAdd}
            onClick={() => setAmount(amount + 1)}
          />
          <Button
            text={
              isLoading ? (
                <Spinner
                  stroke="white"
                  strokeWidth="5"
                  style={{
                    position: "absolute",
                    transform: "translate(-50%,-50%)",
                    height: "3.5rem",
                    width: "3.5rem",
                  }}
                />
              ) : (
                "Add"
              )
            }
            classFromProps={classes.ButtonAddCart}
            onClick={
              !isLoading
                ? async () => {
                    setIsLoading(true);
                    await addProductHandler(
                      modalData.id,
                      amount,
                      loginData.token
                    );
                    setIsOpen(false);
                  }
                : null
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
