import React from "react";

import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";
import Header from "./containers/Header/Header";
import Footer from "./component/Footer/Footer";

import classes from "./App.module.css";

import ROUTES, { RenderRoutes } from "./routes";

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <div className={classes.Container}>
          <Header />
          <RenderRoutes routes={ROUTES} />
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
