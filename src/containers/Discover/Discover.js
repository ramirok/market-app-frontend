import React, { useEffect, useState } from "react";

import { getSome } from "../../utils/fetchServices";
import Carousel from "../../component/UI/Carousel/Carousel";
import Card from "../../component/UI/Card/Card";
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
      <div className={classes.DiscoverContainer}>
        <h3 className={classes.Name}>More products</h3>
        <Carousel
          customSettings={{
            slidesToScroll: 3,
            infinite: true,
          }}
        >
          {items.slice(0, 15).map((el) => (
            // Distribute el's properties: img, alt, price, description
            <Card {...el} key={el.name}></Card>
          ))}
        </Carousel>
      </div>
      <div className={classes.DiscoverContainer} style={{ paddingTop: "0" }}>
        <Carousel
          customSettings={{
            slidesToScroll: 3,
            infinite: true,
          }}
          customStyle={{ paddingTop: "0" }}
        >
          {items.slice(15, 30).map((el) => (
            // Distribute el's properties: img, alt, price, description
            <Card {...el} key={el.name}></Card>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Discover;
