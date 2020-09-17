import React from "react";

import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import Carousel from "../../component/UI/Carousel/Carousel";
import classes from "./History.module.css";

const History = () => {
  return (
    <div className={classes.HistoryContainer}>
      <h3 className={classes.Name}>Seen Before</h3>
      <Carousel customSettings={{ slidesToScroll: 3, infinite: true }}>
        <ProductCard>aaaa</ProductCard>
        <ProductCard>bbbb</ProductCard>
        <ProductCard>cccc</ProductCard>
        <ProductCard>dddd</ProductCard>
        <ProductCard>eeee</ProductCard>
        <ProductCard>ffff</ProductCard>
        <ProductCard>gggg</ProductCard>
        <ProductCard>hhhh</ProductCard>
        <ProductCard>iiii</ProductCard>
        <ProductCard>jjjj</ProductCard>
      </Carousel>
    </div>
  );
};

export default History;
