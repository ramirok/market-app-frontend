import React, { useEffect, useState } from "react";

import { getSome } from "../../utils/fetchServices";
import Carousel from "../../component/UI/Carousel/Carousel";
import Card from "../../component/UI/Card/Card";
import CardFirst from "../../component/UI/CardFirst/CardFirst";
import classes from "./NewArrivals.module.css";

const NewArrivals = () => {
  // Manage items to show in Card component
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Set items fetched
    getSome("new").then((data) => setItems(data));
  }, []);

  return (
    <div className={classes.NewArrivalsContainer}>
      <Carousel>
        <CardFirst>JustArrived</CardFirst>
        {items.map((el) => (
          // Distribute el's properties: img, alt, price, description
          <Card {...el} key={el.name}></Card>
        ))}
      </Carousel>
    </div>
  );
};

export default NewArrivals;
