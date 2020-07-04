import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./containers/Header/Header";
import Footer from "./component/Footer/Footer";
import NewArrivals from "./containers/NewArrivals/NewArrivals";
import TopSellers from "./containers/TopSellers/TopSellers";
import History from "./containers/History/History";
import Discover from "./containers/Discover/Discover";
import Category from "./containers/Category/Category";
import LoginForm from "./component/Login/LoginForm/LoginForm";
import SignUpForm from "./component/SignUp/SignUpForm/SignUpForm";
import classes from "./App.module.css";
import Modal from "./component/UI/Modal/Modal";
import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <div className={classes.Container}>
          <Header />
          <Modal />
          <Switch>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignUpForm />
            </Route>
            <Route path="/:category">
              <Category />
            </Route>
            <Route path="/">
              <NewArrivals />
              <TopSellers />
              <History />
              <Discover />
            </Route>
          </Switch>

          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
