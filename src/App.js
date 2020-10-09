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
        <Header />
        <div className={classes.Container}>
          <RenderRoutes routes={ROUTES} />
        </div>
        <Footer />
      </CartProvider>
    </UserProvider>
  );
};

export default App;
