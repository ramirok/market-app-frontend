import React from "react";

import { useWindowResize } from "../../utils/customHooks";
import NewArrivals from "../NewArrivals/NewArrivals";
import TopSellers from "../TopSellers/TopSellers";
import Categories from "../Categories/Categories";
import Discover from "../Discover/Discover";
import History from "../History/History";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const width = useWindowResize();

  return (
    <>
      <div className={classes.FirstRow}>
        <NewArrivals />

        {/* shows categories when screen width is less than 1000, in bigger screens, categories is included is navBar */}
        {width < 1000 && <Categories />}

        <TopSellers />
      </div>

      <Discover />
      <History />
    </>
  );
};

export default HomePage;
