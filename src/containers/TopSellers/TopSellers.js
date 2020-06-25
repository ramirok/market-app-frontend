import React, { useEffect, useState } from "react";

import Carousel from "../../component/UI/Carousel/Carousel";
import Card from "../../component/UI/Card/Card";
import CardFirst from "../../component/UI/CardFirst/CardFirst";
import classes from "./TopSellers.module.css";

const TopSellers = () => {
  // Manage items to show in Card component
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Set items fetched
    fetch("http://localhost:3001/products/top")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className={classes.TopSellersContainer}>
      <Carousel>
        <CardFirst>TopSellers</CardFirst>
        {items.map((el) => (
          // Distribute el's properties: img, alt, price, description
          <Card {...el} key={el.name}></Card>
        ))}
      </Carousel>
    </div>
  );
};

export default TopSellers;