// this component only renders on screens smaller than 1000px width

import React from "react";

import classes from "./Categories.module.css";

// SVG imports
import { ReactComponent as Vegetables } from "../../assets/categories/vegetables.svg";
import { ReactComponent as Fruits } from "../../assets/categories/fruits.svg";
import { ReactComponent as Spices } from "../../assets/categories/spices.svg";
import { ReactComponent as Snacks } from "../../assets/categories/snacks.svg";
import { ReactComponent as Canned } from "../../assets/categories/canned.svg";

const Categories = () => {
  const categories = {
    Vegetables: <Vegetables className={classes.Icon} />,
    Fruits: <Fruits className={classes.Icon} />,
    Spices: <Spices className={classes.Icon} />,
    Snacks: <Snacks className={classes.Icon} />,
    "Canned Products": <Canned className={classes.Icon} />,
  };

  return (
    <div className={classes.CategoriesContainer}>
      {Object.keys(categories).map((el) => (
        <a
          href={`/category/${el.toLowerCase().replace(" ", "-")}`}
          className={classes.Card}
          key={el}
        >
          <div className={classes.Arrow} />
          <div className={classes.Line} />

          {/* icon */}
          {categories[el]}

          {/* title */}
          <p className={classes.Title}>{el}</p>
        </a>
      ))}
    </div>
  );
};

export default Categories;
