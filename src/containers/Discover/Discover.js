import React, { useEffect, useState } from "react";

import { getSome } from "../../utils/fetchServices";
import Slider from "../../component/UI/Slider/Slider";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import classes from "./Discover.module.css";

// SVG imports
import { ReactComponent as DiscoverIcon } from "../../assets/more-products.svg";

const Discover = () => {
  // Items to show in Card component
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Set items fetched
    getSome().then((data) => setItems(data));
  }, []);

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
        <div style={{ marginTop: "2rem" }}>
          <Slider>
            {/* product cards */}
            {items.slice(0, 15).map((el) => (
              // Distribute el's properties: name, img, price, description
              <ProductCard {...el} key={el.name} />
            ))}
          </Slider>
        </div>

        {/* second 15 items carousel */}
        <div style={{ marginTop: "2rem" }}>
          <Slider>
            {items.slice(15, 30).map((el) => (
              // Distribute el's properties: name, img, price, description
              <ProductCard {...el} key={el.name} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Discover;
