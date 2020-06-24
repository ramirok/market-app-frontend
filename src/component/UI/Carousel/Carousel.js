import React from "react";
import Slider from "react-slick";

import classes from "./Carousel.module.css";

const Carousel = (props) => {
  /*
Recives:
 -custom settings for Slider component
 -custom style inline style
*/
  const { customSettings, customStyle } = props;

  // Settings for Slider component
  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    variableWidth: true,
    ...customSettings,
  };
  return (
    <div className={classes.CarouselContainer} style={{ ...customStyle }}>
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
};

export default Carousel;
