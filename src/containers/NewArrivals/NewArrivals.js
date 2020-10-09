import React, { useEffect, useState } from "react";

import { fetchService } from "../../utils/fetchServices";
import { useWindowResize } from "../../utils/customHooks";
import Slider from "../../component/UI/Slider/Slider";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import ProductSectionCard from "../../component/UI/Card/ProductSectionCard/ProductSectionCard";
import LoadingText from "../../component/UI/LoadingText/LoadingText";
import classes from "./NewArrivals.module.css";

// SVG imports
import { ReactComponent as NewIcon } from "../../assets/new.svg";
import { ReactComponent as Curve } from "../../assets/curveAsymmetrical.svg";
import { ReactComponent as Curve2 } from "../../assets/curveAsymmetrical2.svg";

const NewArrivals = () => {
  // Items to show in Card component
  const [items, setItems] = useState([]);

  const width = useWindowResize();

  // style for loading animation
  const style =
    width > 700
      ? {
          minWidth: "20rem",
          width: "20rem",
          height: "16rem",
        }
      : {
          height: "16rem",
          minWidth: "15rem",
          width: "auto",
          flexGrow: 1,
        };

  useEffect(() => {
    // Set items fetched
    fetchService("get", "products?sortBy=created<_at").then((data) =>
      setItems(data)
    );
  }, []);

  let render = (
    <>
      {/* presentation card */}
      <ProductSectionCard>
        <Curve className={classes.Curve} />
        <Curve2 className={classes.Curve2} />
        <NewIcon className={classes.NewIcon} />
        <p className={classes.Title}>Just Arrived</p>
      </ProductSectionCard>

      {/* products cards, show loading animation if items are not set yet */}
      {items.length < 1 ? (
        <LoadingText style={style} number={3} />
      ) : (
        items.map((el) => (
          // Distribute el's properties: name, img, price, description
          <ProductCard {...el} key={el.name} />
        ))
      )}
    </>
  );

  return (
    <div className={classes.NewArrivalsContainer}>
      {/* use slider for big screens */}
      {width > 700 ? <Slider>{render}</Slider> : render}
    </div>
  );
};

export default NewArrivals;
