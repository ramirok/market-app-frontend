import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { addItem } from "../../../store/actions/cart";
import { capitalizeName } from "../../../utils/helpers";
import Button from "../../Button/Button";
import classes from "./Modal.module.css";

const Modal = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modal);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(0);
  }, [modalData]);

  const isLogged = useSelector((state) => state.auth.userId);
  const history = useHistory();

  const closeModal = () => {
    dispatch({ type: "HIDE" });
  };

  const addToChart = (amount) => {
    if (isLogged) {
      dispatch(
        addItem(
          {
            name: modalData.name,
            price: modalData.price,
            img: modalData.img,
            description: modalData.description,
          },
          amount
        )
      );
    } else {
      dispatch({ type: "HIDE" });
      history.push("/login");
    }
  };

  return (
    <ReactModal
      onRequestClose={closeModal}
      className={classes.Content}
      isOpen={modalData.show}
      ariaHideApp={false}
      style={{ overlay: { zIndex: "3" } }}
    >
      <div className={classes.ImageContainer}>
        <img
          src={modalData.img}
          alt={modalData.name}
          className={classes.Image}
        />
      </div>
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
            onClick={() => addToChart(amount)}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
