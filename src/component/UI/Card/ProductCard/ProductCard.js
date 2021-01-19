import React, { useState } from "react";

import { useUser } from "../../../../context/userContext";
import { useCart } from "../../../../context/cartContext";
import { capitalizeName } from "../../../../utils/helpers";
import ProductModal from "../../Modal/ProductModal/ProductModal";
import Spinner from "../../Spinner/Spinner";
import classes from "./ProductCard.module.css";

const ProductCard = (props) => {
  /*
Recives:
 -id: product id
 -name: product name
 -img: img url
 -price: product price
 -description: product description
*/
  const { id, name, img, price, description } = props;

  // toggles modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // customHook for cart context
  const { addProductHandler } = useCart();

  // loading state for spinner
  const [isLoading, setIsLoading] = useState(false);

  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  return (
    <>
      {/* Renders modal when is open = true */}
      {isOpen && (
        <ProductModal
          setIsOpen={setIsOpen}
          modalData={{ name, img, price, description, id }}
        />
      )}

      <div className={classes.CardContainer}>
        {/* cart image */}
        <div
          className={classes.CardImage}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={`/${img}`} alt={name} className={classes.Image} />
        </div>

        {/* add to chart button */}
        <div
          className={classes.Plus}
          onClick={
            // allows on click if loading = false
            !isLoading
              ? async () => {
                  setIsLoading(true);
                  // if product added successfully, setLoading = false
                  (await addProductHandler(id, 1, loginData.token)) &&
                    setIsLoading(false);
                }
              : null
          }
        >
          {isLoading ? <Spinner white /> : "+"}
        </div>

        {/* card footer */}
        <div className={classes.CardFoot}>
          <span>{`$ ${price} `}</span>
          <span className={classes.Name}>{capitalizeName(name)}</span>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
