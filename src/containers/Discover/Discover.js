import React, { useEffect, useState } from "react";

import { getSome } from "../../utils/fetchServices";
import Carousel from "../../component/UI/Carousel/Carousel";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import classes from "./Discover.module.css";

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
      {/* first 15 items carousel */}
      <div className={classes.DiscoverContainer}>
        <h3 className={classes.Name}>More products</h3>
        <Carousel
          customSettings={{
            slidesToScroll: 3,
            infinite: true,
          }}
        >
          {items.slice(0, 15).map((el) => (
            // Distribute el's properties: name, img, price, description
            <ProductCard {...el} key={el.name} />
          ))}
        </Carousel>
      </div>

      {/* second 15 items carousel */}
      <div className={classes.DiscoverContainer} style={{ paddingTop: "0" }}>
        <Carousel
          customSettings={{
            slidesToScroll: 3,
            infinite: true,
          }}
          customStyle={{ paddingTop: "0" }}
        >
          {items.slice(15, 30).map((el) => (
            // Distribute el's properties: name, img, price, description
            <ProductCard {...el} key={el.name} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Discover;
