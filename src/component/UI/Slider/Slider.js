import React, { useState, useRef, useEffect } from "react";

import classes from "./Slider.module.css";

// prev arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className={classes.PrevArrowContainer}>
      <div className={classes.PrevArrow}></div>
    </div>
  );
};

// next arrot
const NextArrow = (props) => {
  const { onClick } = props;

  return (
    <div onClick={onClick} className={classes.NextArrowContainer}>
      <div className={classes.NextArrow}></div>
    </div>
  );
};

const Slider = (props) => {
  const [showArrows, setShowArrows] = useState({ prev: false, next: true });

  const slider = useRef();

  // prev arrow method
  const prev = () => {
    if (slider.current.scrollLeft - 220 < 220) {
      slider.current.scrollLeft = 0;
      setShowArrows({ prev: false, next: true });
    } else if (slider.current.scrollLeft > 0) {
      slider.current.scrollLeft -= 220;
      setShowArrows({ prev: true, next: true });
    }
  };

  // next arrow method
  const next = () => {
    const scrollLeftMax =
      slider.current.scrollWidth - slider.current.clientWidth;

    if (
      slider.current.scrollLeft < scrollLeftMax &&
      scrollLeftMax - (slider.current.scrollLeft + 200) > 200
    ) {
      slider.current.scrollLeft += 220;
      setShowArrows({ prev: true, next: true });
    } else {
      slider.current.scrollLeft = scrollLeftMax;
      setShowArrows({ prev: true, next: false });
    }
  };

  useEffect(() => {
    slider.current.scrollLeft = 0;
  }, []);

  return (
    <div className={classes.ComponentContainer}>
      {showArrows.prev && <PrevArrow onClick={prev} />}
      {showArrows.next && <NextArrow onClick={next} />}

      <div
        className={classes.SliderContainer}
        ref={(ref) => (slider.current = ref)}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Slider;
