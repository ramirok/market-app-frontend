import React from "react";
import { Route, Switch } from "react-router-dom";

import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";
import Header from "./containers/Header/Header";
import Footer from "./component/Footer/Footer";
import NewArrivals from "./containers/NewArrivals/NewArrivals";
import TopSellers from "./containers/TopSellers/TopSellers";
import History from "./containers/History/History";
import Discover from "./containers/Discover/Discover";
import Category from "./containers/Category/Category";
import LoginForm from "./component/FormContainer/LoginForm/LoginForm";
import ResetPassForm from "./component/Login/ResetPassForm/ResetPassForm";
import SignUpForm from "./component/FormContainer/SignUpForm/SignUpForm";
import ShoppingCart from "./containers/ShoppingCart/ShoppingCart";
import AccountSecurity from "./containers/AccountSecurity/AccountSecurity";
import classes from "./App.module.css";

import ROUTES, { RenderRoutes } from "./routes";

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <div className={classes.Container}>
          <Header />
          <RenderRoutes routes={ROUTES} />
          {/* 
          <Switch>
            <Route path="/security">
              <AccountSecurity />
            </Route>
            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </Switch>
         */}
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
