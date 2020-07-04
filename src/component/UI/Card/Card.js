import React, { useState } from "react";

import { useUser } from "../../../context/userContext";
import { useCart } from "../../../context/cartContext";
import { capitalizeName } from "../../../utils/helpers";
import ProductModal from "../Modal/ProductModal/ProductModal";
import classes from "./Card.module.css";

const Card = (props) => {
  /*
Recives:
-name: product name
 -img: img url
 -alt: alt text for image
 -price: product price
 -description: product description
*/
  const { name, img, alt, price, description } = props;

  // Toggles modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // customHook for cart context
  const { addProductHandler } = useCart();

  // customHook for user context:
  // loginData = {message, loading, userId, token}
  const { loginData } = useUser();

  return (
    <>
      {isOpen && (
        <ProductModal isOpen={isOpen} setIsOpen={setIsOpen} item={name} />
      )}

      <div className={classes.CardContainer}>
        {/* cart image */}
        <div
          className={classes.CardImage}
          onClick={() => {
            // open modal onClick
            setIsOpen(true);
          }}
        >
          <img src={img} alt={alt} className={classes.Image} />
        </div>

        {/* add to chart button */}
        <div
          className={classes.Plus}
          onClick={() => addProductHandler(name, price, 1, loginData.token)}
        >
          +
        </div>

        {/* card footer */}
        <div className={classes.CardFoot}>
          <span>{`$ ${price} `}</span>
          <span className={classes.Name}>
            {name ? capitalizeName(name) : undefined}
          </span>
          <span className={classes.Name}>{description}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
