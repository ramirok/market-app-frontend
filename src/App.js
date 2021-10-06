import React, { Suspense } from "react";

import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";
import Header from "./containers/Header/Header";
import Footer from "./component/Footer/Footer";
import Spinner from "./component/UI/Spinner/Spinner";

import classes from "./App.module.css";

import ROUTES, { RenderRoutes } from "./routes";

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <div className={classes.App}>
          <Header />
          <div className={classes.Container}>
            <Suspense
              fallback={
                <div className={classes.SpinnerContainer}>
                  <Spinner />
                </div>
              }
            >
              <RenderRoutes routes={ROUTES} />
            </Suspense>
          </div>

          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
