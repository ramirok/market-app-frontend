import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import { fetchService } from "../../utils/fetchServices";
import { useWindowResize } from "../../utils/customHooks";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import classes from "./CategoryPage.module.css";

const Category = () => {
  // get param from URL
  const { cat } = useParams();

  // items to show in card component
  const [items, setItems] = useState([]);

  const width = useWindowResize();

  useEffect(() => {
    fetchService({ method: "get", url: `products/cat/${cat}` }).then((data) =>
      setItems(data)
    );
  }, [cat]);

  // category list for side menu
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
            // distribute product's properties: name, img, price, description
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
