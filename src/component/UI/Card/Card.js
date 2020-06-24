import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { addItem } from "../../../store/actions/cart";
import classes from "./Card.module.css";

const Card = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.userId);
  const history = useHistory();
  /*
Recives:
 -img: img url
 -alt: alt text
 -price: product price
 -description: product description
*/
  const { img, alt, price, name, description } = props;

  const addToChart = () => {
    isLogged ? dispatch(addItem(name)) : history.push("/login");
  };

  return (
    <div className={classes.CardContainer}>
      <div className={classes.CardImage}>
        <img src={img} alt={alt} className={classes.Image} />
      </div>
      <span className={classes.Plus} onClick={addToChart}>
        +
      </span>
      <div className={classes.CardFoot}>
        <span>{`$ ${price} `}</span>
        <span className={classes.Name}>{name}</span>
        <span className={classes.Name}>{description}</span>
      </div>
    </div>
  );
};

export default Card;
