import React, { useEffect, useState } from "react";

import { useUser } from "../../context/userContext";
import { getHistory } from "../../utils/fetchServices";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import Slider from "../../component/UI/Slider/Slider";
import classes from "./History.module.css";

// SVG imports
import { ReactComponent as HistoryIcon } from "../../assets/history.svg";

const History = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // Items to show in Card component
  const [items, setItems] = useState([]);

  useEffect(() => {
    // when there is a token, get user's history
    if (loginData.token) {
      getHistory(loginData.token).then((data) => setItems(data));
    }
  }, [loginData.token]);

  // if no items in history, return null
  if (items.length < 1) {
    return null;
  }

  return (
    <div className={classes.HistoryContainer}>
      {/* section name */}
      <div className={classes.NameContainer}>
        <h3 className={classes.Name}>Seen Before</h3>
        <HistoryIcon className={classes.HistoryIcon} />
      </div>

      {/* carousel */}
      <div style={{ marginTop: "2rem" }}>
        <Slider>
          {items.map((el) => (
            // Distribute el's properties: name, img, price, description
            <ProductCard {...el} key={el.name} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default History;
