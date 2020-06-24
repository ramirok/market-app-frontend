import React from "react";

import Card from "../../component/UI/Card/Card";
import Carousel from "../../component/UI/Carousel/Carousel";
import classes from "./History.module.css";

const History = () => {
  return (
    <div className={classes.HistoryContainer}>
      <h3 className={classes.Name}>Seen Before</h3>
      <Carousel customSettings={{ slidesToScroll: 3, infinite: true }}>
        <Card>aaaa</Card>
        <Card>bbbb</Card>
        <Card>cccc</Card>
        <Card>dddd</Card>
        <Card>eeee</Card>
        <Card>ffff</Card>
        <Card>gggg</Card>
        <Card>hhhh</Card>
        <Card>iiii</Card>
        <Card>jjjj</Card>
      </Carousel>
    </div>
  );
};

export default History;
