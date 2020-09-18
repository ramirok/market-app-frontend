import React from "react";

import { capitalizeName } from "../../../../utils/helpers";
import classes from "./OrderCard.module.css";

const OrderCard = (props) => {
  /*
Recives:
 -products: array of purchased products
 -createdAt: date of purchase
*/
  const { products, createdAt } = props;

  // cart total
  const total = products
    .map((el) => el.data.price * el.quantity)
    .reduce((acc, curr) => acc + curr);

  return (
    <div className={classes.CardContainer}>
      {products.map((el) => (
        <div className={classes.ProductContainer} key={el.data.name}>
          {/* product image */}
          <div className={classes.ImagesContainer}>
            <img
              src={`/${el.data.img}`}
              alt={el.data.name}
              className={classes.Image}
            />
          </div>

          {/* product info */}
          <div className={classes.ProductInfo}>
            <p>{capitalizeName(el.data.name)}</p>
            <p>{el.data.description}</p>
          </div>

          {/* product price and quantity */}
          <div>
            <p style={{ fontWeight: "400" }}>
              $ {el.data.price} x{el.quantity}
            </p>
            <p style={{ textAlign: "end" }}>
              $ {(el.data.price * el.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      {/* cart total */}
      <p className={classes.PriceTotal}>Total: $ {total.toFixed(2)}</p>

      {/* date of purchase */}
      <p style={{ fontWeight: "400" }}>
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};
export default OrderCard;
