import React, { useEffect, useState } from "react";

import { useUser } from "../../../../context/userContext";
import { useCart } from "../../../../context/cartContext";
import { capitalizeName } from "../../../../utils/helpers";
import { postHistory } from "../../../../utils/fetchServices";
import Modal from "../Modal";
import Button from "../../../Button/Button";
import Spinner from "../../Spinner/Spinner";

import classes from "./ProductModal.module.css";

const ProductModal = (props) => {
  /*
Recives:
 -isOpen: modal open/close state
 -setIsOpen: changes isOpen state
 -props.children
*/
  const { isOpen, setIsOpen, modalData } = props;

  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // customHook for cart context
  const { addProductHandler } = useCart();

  // product amount to add to cart
  const [amount, setAmount] = useState(1);

  // isLoading state for spinner
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // post last seen item
    postHistory(loginData.token, { newId: props.modalData.id });
  }, [loginData.token, props.modalData.id]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {/* Image Container */}
      <div className={classes.ImageContainer}>
        <img
          src={`/${modalData.img}`}
          alt={modalData.name}
          className={classes.Image}
        />
      </div>

      {/* Info Container */}
      <div className={classes.Info}>
        {/* name */}
        <h3>{capitalizeName(modalData.name)}</h3>

        {/* description */}
        <p>
          {capitalizeName(modalData.description)}
          {modalData.img.includes("vegetables") ||
          modalData.img.includes("fruits")
            ? " x kg"
            : modalData.img.includes("spices")
            ? " x 100g"
            : null}
        </p>

        {/* price */}
        <h4 className={classes.Price}>{`Unit price $ ${modalData.price}`}</h4>

        {/* amount and total price */}
        <div>
          <p>
            Amount <span>{amount}</span>
          </p>
          <p>Total {`$ ${(amount * modalData.price).toFixed(2)}`}</p>
        </div>

        {/* buttons */}
        <div className={classes.ButtonsContainer}>
          <Button
            text="-"
            classFromProps={classes.ButtonRemove}
            onClick={() => {
              setAmount(amount > 1 ? amount - 1 : 1);
            }}
          />
          <Button
            text="+"
            classFromProps={classes.ButtonAdd}
            onClick={() => setAmount(amount + 1)}
          />
          <Button
            // shows spinner when isLoading = true
            text={isLoading ? <Spinner white /> : "Add"}
            classFromProps={classes.ButtonAddCart}
            onClick={
              // allows on click when isLoading = false
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
