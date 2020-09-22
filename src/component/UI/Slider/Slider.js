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
  // x axis translate
  const [x, setX] = useState(0);

  // when true show the next arrow
  const [showNext, setShowNext] = useState(true);

  const slider = useRef();
  const container = useRef();

  // prev arrow method
  const prev = () => {
    if (-x - 220 < 220) {
      setX(0);
    } else if (-x > 0) {
      setX((x) => x + 220);
      setShowNext(true);
    }
  };

  // next arrow method
  const next = () => {
    if (
      -x < slider.current.offsetWidth - container.current.offsetWidth &&
      slider.current.offsetWidth - container.current.offsetWidth - 200 + x > 200
    ) {
      setX((x) => x - 220);
    } else {
      setX(container.current.offsetWidth - slider.current.offsetWidth - 20);
    }
  };

  useEffect(() => {
    // check if it has to show next button in the first render
    setShowNext(
      -x < slider.current.offsetWidth - container.current.offsetWidth - 220
    );
  }, [x, props.children]);

  return (
    <div
      className={classes.ComponentContainer}
      ref={(ref) => (container.current = ref)}
    >
      {-x > 0 && <PrevArrow onClick={prev} />}
      <div style={{ overflow: "hidden" }}>
        <div
          className={classes.Slider}
          style={{ transform: `translateX(${x}px)` }}
          ref={(ref) => (slider.current = ref)}
        >
          {props.children}
        </div>
      </div>
      {showNext && <NextArrow onClick={next} />}
    </div>
  );
};

export default Slider;
