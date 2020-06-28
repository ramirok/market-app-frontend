import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { capitalizeName } from "../../../utils/helpers";
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
    isLogged
      ? dispatch(addItem({ name, price, img, description }))
      : history.push("/login");
  };

  return (
    <div className={classes.CardContainer} draggable={false}>
      <div
        className={classes.CardImage}
        onClick={() =>
          dispatch({ type: "SHOW", img, name, price, description })
        }
      >
        <img src={img} alt={alt} className={classes.Image} />
      </div>
      <span className={classes.Plus} onClick={addToChart}>
        +
      </span>
      <div className={classes.CardFoot}>
        <span>{`$ ${price} `}</span>
        <span className={classes.Name}>
          {name ? capitalizeName(name) : undefined}
        </span>
        <span className={classes.Name}>{description}</span>
      </div>
    </div>
  );
};

export default Card;
