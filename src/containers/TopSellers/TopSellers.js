import React, { useEffect, useState } from "react";

import { getSome } from "../../utils/fetchServices";
import Slider from "../../component/UI/Slider/Slider";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import ProductSectionCard from "../../component/UI/Card/ProductSectionCard/ProductSectionCard";
import classes from "./TopSellers.module.css";

// SVG imports
import { ReactComponent as TopSeller } from "../../assets/medal.svg";
import { ReactComponent as Curve } from "../../assets/curveAsymmetrical.svg";
import { ReactComponent as Curve2 } from "../../assets/curveAsymmetrical2.svg";

const TopSellers = () => {
  // Items to show in Card component
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Set items fetched
    getSome("sortBy=sold").then((data) => setItems(data));
  }, []);

  return (
    <div className={classes.TopSellersContainer}>
      <Slider>
        {/* presentation card */}
        <ProductSectionCard>
          <Curve className={classes.Curve} />
          <Curve2 className={classes.Curve2} />
          <p className={classes.Title}>Top Sellers</p>
          <TopSeller className={classes.MedalIcon} />
        </ProductSectionCard>

        {/* product cards */}
        {items.map((el) => (
          // Distribute el's properties: name, img, price, description
          <ProductCard {...el} key={el.name} />
        ))}
      </Slider>
    </div>
  );
};

export default TopSellers;
