import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./containers/Header/Header";
import Footer from "./component/Footer/Footer";
import NewArrivals from "./containers/NewArrivals/NewArrivals";
import TopSellers from "./containers/TopSellers/TopSellers";
import History from "./containers/History/History";
import Discover from "./containers/Discover/Discover";
import Category from "./containers/Category/Category";
import LoginForm from "./component/Login/LoginForm/LoginForm";
import SignUpForm from "./component/SignUp/SignUpForm/SignUpForm";
import Logout from "./component/Logout/Logout";
import classes from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = window.localStorage.getItem("logged");
    dispatch({ type: "LOGIN_SUCCESS", ...JSON.parse(user) });
  });
  return (
    <div className={classes.Container}>
      <Header />
      <Switch>
        <Route path="/log-out">
          <Logout />
        </Route>
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
  );
};

export default App;
