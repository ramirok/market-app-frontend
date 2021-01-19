import React, { useEffect, useState } from "react";

import { useUser } from "../../context/userContext";
import { fetchService } from "../../utils/fetchServices";
import { useWindowResize } from "../../utils/customHooks";
import ProductCard from "../../component/UI/Card/ProductCard/ProductCard";
import Slider from "../../component/UI/Slider/Slider";
import classes from "./History.module.css";

// SVG imports
import { ReactComponent as HistoryIcon } from "../../assets/history.svg";

const History = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  const width = useWindowResize();

  // items to show in Card component
  const [items, setItems] = useState([]);

  useEffect(() => {
    // when there is a token, get user's history
    if (loginData.token) {
      fetchService({
        method: "get",
        url: "users/history",
        token: loginData.token,
      }).then((data) => {
        setItems(data);
      });
    }
  }, [loginData.token]);

  // if history has less than 8 items, don't show history
  if (items.length < 8) {
    return null;
  }

  let render = (
    <>
      {items.map((el) => (
        // Distribute product's properties: name, img, price, description
        <ProductCard {...el} key={el.name} />
      ))}
    </>
  );

  return (
    <div className={classes.HistoryContainer}>
      {/* section name */}
      <div className={classes.NameContainer}>
        <h3 className={classes.Name}>Seen Before</h3>
        <HistoryIcon className={classes.HistoryIcon} />
      </div>

      {/* products */}
      <div className={classes.ProductsContainer}>
        {/* use slider for big screens */}
        {width > 700 ? <Slider>{render}</Slider> : render}
      </div>
    </div>
  );
};

export default History;
