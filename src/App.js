import React from "react";
import classes from "./App.module.css";

import Header from "./containers/Header/Header";

const App = () => {
  return (
    <div className={classes.Container}>
      <Header />
    </div>
  );
};

export default App;
