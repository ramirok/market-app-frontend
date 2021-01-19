// this component only renders on screens bigger than 700px width

import React, { useEffect, useState } from "react";

import { fetchService } from "../../utils/fetchServices";
import { useWindowResize } from "../../utils/customHooks";
import Slider from "../../component/UI/Slider/Slider";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import LoadingText from "../../component/UI/LoadingText/LoadingText";
import classes from "./Discover.module.css";

// SVG imports
import { ReactComponent as DiscoverIcon } from "../../assets/more-products.svg";

const Discover = () => {
  // items to show in Card component
  const [items, setItems] = useState([]);

  const width = useWindowResize();

  // style for loading animation
  const style =
    width > 700
      ? {
          minWidth: "20rem",
          width: "20rem",
          height: "23rem",
        }
      : {
          height: "16rem",
          minWidth: "15rem",
          width: "auto",
          flexGrow: 1,
        };

  useEffect(() => {
    fetchService({ method: "get", url: "products" }).then((data) =>
      setItems(data)
    );
  }, []);

  const row1 = (
    <>
      {/* products cards, show loading animation if items are not set yet */}
      {items.length < 1 ? (
        <LoadingText style={style} number={8} />
      ) : (
        items.slice(0, 15).map((el) => (
          // Distribute product's properties: name, img, price, description
          <ProductCard {...el} key={el.name} />
        ))
      )}
    </>
  );

  const row2 = (
    <>
      {/* products cards, show loading animation if items are not set yet */}
      {items.length < 1 ? (
        <LoadingText style={style} number={8} />
      ) : (
        items.slice(15, 30).map((el) => (
          // Distribute product's properties: name, img, price, description
          <ProductCard {...el} key={el.name} />
        ))
      )}
    </>
  );

  return (
    // Returns 2 carousel components
    <>
      <div className={classes.DiscoverContainer}>
        {/* section name */}
        <div className={classes.NameContainer}>
          <h3 className={classes.Name}>More products</h3>
          <DiscoverIcon className={classes.DiscoverIcon} />
        </div>

        {/* first 15 items carousel */}
        <div className={classes.ProductsContainer}>
          {/* use slider for big screens */}
          {width > 700 ? <Slider>{row1}</Slider> : row1}
        </div>

        {/* second 15 items carousel */}
        <div className={classes.ProductsContainer}>
          {/* use slider for big screens */}
          {width > 700 ? <Slider>{row2}</Slider> : row2}
        </div>
      </div>
    </>
  );
};

export default Discover;
