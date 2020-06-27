import React from "react";

import { useInputData } from "../../utils/customHooks";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  const search = useInputData();

  return (
    <div className={classes.SearchBarContainer}>
      <input type="text" className={classes.SearchBar} {...search} />
      <Button text="Search" classFromProps={classes.Button} />
      <NavBar />
    </div>
  );
};

export default SearchBar;
