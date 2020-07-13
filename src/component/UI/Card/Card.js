import React, { useState } from "react";

import { useUser } from "../../../context/userContext";
import { useCart } from "../../../context/cartContext";
import { capitalizeName } from "../../../utils/helpers";
import ProductModal from "../Modal/ProductModal/ProductModal";
import classes from "./Card.module.css";

// SVG imports
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";

const Card = (props) => {
  /*
Recives:
-name: product name
 -img: img url
 -alt: alt text for image
 -price: product price
 -description: product description
*/
  const { id, name, img, alt, price, description } = props;

  // Toggles modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // customHook for cart context
  const { addProductHandler } = useCart();

  // loading state for spinner
  const [isLoading, setIsLoading] = useState(false);

  // customHook for user context:
  // loginData = {message, loading, userId, token}
  const { loginData } = useUser();

  return (
    <>
      {isOpen && (
        <ProductModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          item={name}
          modalData={{ name, img, price, description, id }}
        />
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
          <img src={`/${img}`} alt={alt} className={classes.Image} />
        </div>

        {/* add to chart button */}
        <div
          className={classes.Plus}
          onClick={
            !isLoading
              ? async () => {
                  setIsLoading(true);
                  await addProductHandler(id, 1, loginData.token);
                  setIsLoading(false);
                }
              : null
          }
        >
          {isLoading ? (
            <Spinner
              stroke="white"
              strokeWidth="5"
              style={{
                position: "absolute",
                height: "2.5rem",
                width: "2.5rem",
              }}
            />
          ) : (
            "+"
          )}
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
