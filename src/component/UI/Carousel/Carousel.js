import React, { useRef, useState } from "react";
import Slider from "react-slick";

import classes from "./Carousel.module.css";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className={classes.PrevArrowContainer}>
      <div className={classes.PrevArrow}></div>
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className={classes.NextArrowContainer}>
      <div className={classes.NextArrow}></div>
    </div>
  );
};

const Carousel = (props) => {
  const slider = useRef();

  /*
Recives:
 -custom settings for Slider component
 -custom style inline style
 -arrayLength: number of slider
*/
  const { customSettings, customStyle, arrayLength } = props;

  const [page, setPage] = useState(0);

  const prev = () => {
    if (page > 0) {
      slider.current.slickPrev();
    }
  };

  const next = () => {
    if (page < arrayLength - 3) {
      slider.current.slickNext();
    }
  };

  // Settings for Slider component
  const settings = {
    slidesToScroll: 2,
    infinite: false,
    variableWidth: true,
    arrows: false,
    afterChange: (e) => setPage(e),
    slidesToShow: 4,
    ...customSettings,
  };

  return (
    <div className={classes.CarouselContainer} style={{ ...customStyle }}>
      {page > 0 && <PrevArrow onClick={prev} />}
      <Slider {...settings} ref={(e) => (slider.current = e)}>
        {props.children}
      </Slider>
      {page < arrayLength - 3 && <NextArrow onClick={next} />}
    </div>
  );
};

export default Carousel;
