import React, { useState, useEffect } from "react";

import { useUser } from "../../../../context/userContext";
import { useCart } from "../../../../context/cartContext";
import { capitalizeName } from "../../../../utils/helpers";
import { getItem } from "../../../../utils/fetchServices";
import Modal from "../Modal";
import Button from "../../../Button/Button";

import classes from "./ProductModal.module.css";

const ProductModal = (props) => {
  /*
Recives:
 -isOpen: modal open/close state
 -setIsOpen: changes isOpen state
 -item: item to fetch
 -props.children
*/
  const { isOpen, setIsOpen, item } = props;

  // customHook for user context:
  // loginData returns ={message, loading, userId, token}
  const { loginData } = useUser();

  // customHook for cart context
  const { addProductHandler } = useCart();

  // product amount to add to cart
  const [amount, setAmount] = useState(0);

  // default modal data, before fetch actual data
  const [modalData, setModalData] = useState({
    name: "name",
    description: "description",
    price: 6,
    img: "img",
  });

  useEffect(() => {
    // get item data and sets modalData
    getItem(item).then((data) => setModalData(data));
  }, [item]);

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
          {capitalizeName(modalData.description)}{" "}
          {modalData.img.includes("vegetables") ||
          modalData.img.includes("fruits")
            ? "x kg"
            : modalData.img.includes("spices")
            ? "x 100g"
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
            text="Add"
            classFromProps={classes.ButtonAddCart}
            onClick={async () => {
              await addProductHandler(
                modalData.name,
                modalData.price,
                amount,
                loginData.token
              );
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
