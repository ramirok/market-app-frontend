import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import { fetchService } from "../../utils/fetchServices";
import { useWindowResize } from "../../utils/customHooks";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import classes from "./CategoryPage.module.css";

const Category = () => {
  // Get param from URL
  const { cat } = useParams();

  // Items to show in Card component
  const [items, setItems] = useState([]);

  const width = useWindowResize();

  useEffect(() => {
    // Set items fetched
    fetchService("get", `products/cat/${cat}`).then((data) => setItems(data));
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
          <ul className={classes.List}>
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
        <div className={classes.Products}>
          {/* Sets a card for every item  */}
          {items.map((el) =>
            // Distribute el's properties: name, img, price, description
            width > 700 ? (
              <div key={el.name}>
                <ProductCard {...el} />
              </div>
            ) : (
              <ProductCard {...el} key={el.name} />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
