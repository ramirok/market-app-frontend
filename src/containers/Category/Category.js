import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import { getCategory } from "../../utils/fetchServices";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import classes from "./Category.module.css";

const Category = () => {
  // Get param from URL
  const { cat } = useParams();

  // Items to show in Card component
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Set items fetched
    getCategory(cat).then((data) => setItems(data));
  }, [cat]);

  // Category list for side menu
  const categoryList = [
    "Vegetables",
    "Fruits",
    "Spices",
    "Snacks",
    "Canned products",
  ];

  return (
    <>
      <div className={classes.Head}></div>

      <div className={classes.Container}>
        {/* Categories menu */}
        <div className={classes.Categories}>
          <ul style={{ listStyle: "none" }}>
            {/* Sets a link for every category */}
            {categoryList.map((el) => (
              <li key={el}>
                <NavLink
                  className={classes.Item}
                  activeClassName={classes.Item_active}
                  to={`/category/${el.replace(" ", "-").toLowerCase()}`}
                >
                  {el}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Products cards */}
        <div className={classes.CategoryContainer}>
          {/* Sets a card for every item  */}
          {items.map((el) => (
            // Distribute el's properties: name, img, price, description
            <ProductCard {...el} key={el.name} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
