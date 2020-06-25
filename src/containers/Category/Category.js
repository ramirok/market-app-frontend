import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import Card from "../../component/UI/Card/Card";
import classes from "./Category.module.css";

const Category = () => {
  // Get param from URL
  const { category } = useParams();

  // Manage items to show in Card component
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Set items fetched
    fetch(
      `http://localhost:3001/products/${
        category.includes("-")
          ? category.slice(0, category.indexOf("-"))
          : category
      }`
    )
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [category]);

  // Category list for side navbar
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
      <div className={classes.Categories}>
        <ul style={{ listStyle: "none" }}>
          {/* Sets a link for every category */}
          {categoryList.map((el) => (
            <li key={el}>
              <NavLink
                className={classes.Item}
                activeClassName={classes.Item_active}
                to={`/${el.replace(" ", "-").toLowerCase()}`}
              >
                {el}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.CategoryContainer}>
        {/* Sets a card for every item  */}
        {items.map((el) => (
          <Card {...el} key={el.name} />
        ))}
      </div>
    </>
  );
};

export default Category;
