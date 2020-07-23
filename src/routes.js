import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NewArrivals from "./containers/NewArrivals/NewArrivals";
import TopSellers from "./containers/TopSellers/TopSellers";
import History from "./containers/History/History";
import Discover from "./containers/Discover/Discover";
import LoginForm from "./component/FormContainer/LoginForm/LoginForm";
import SignUpForm from "./component/FormContainer/SignUpForm/SignUpForm";
import ForgotPassForm from "./component/FormContainer/ForgotPassForm/ForgotPassForm";
import ResetPassForm from "./component/FormContainer/ResetPassForm/ResetPassForm";
import ActivateForm from "./component/FormContainer/ActivateForm/ActivateForm";
import Category from "./containers/Category/Category";
import AccountSecurity from "./containers/AccountSecurity/AccountSecurity";
import ShoppingCart from "./containers/ShoppingCart/ShoppingCart";

const ROUTES = [
  //   { path: "/", key: "ROOT", exact: true, component: () => <h1>Log in</h1> },
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: () => (
      <>
        <NewArrivals />
        <TopSellers />
        <History />
        <Discover />
      </>
    ),
  },
  { path: "/category/:cat", key: "CAT", component: Category },
  {
    path: "/auth",
    key: "AUTH",
    component: RenderRoutes,
    routes: [
      {
        path: "/auth/signup",
        key: "AUTH_SIGNUP",
        exact: true,
        component: SignUpForm,
      },
      {
        path: "/auth/activate/:token",
        key: "AUTH_ACTIVATE",
        exact: true,
        component: ActivateForm,
      },
      {
        path: "/auth/login",
        key: "AUTH_LOGIN",
        exact: true,
        component: LoginForm,
      },
      {
        path: "/auth/forgot",
        key: "AUTH_FORGOT",
        exact: true,
        component: ForgotPassForm,
      },

      {
        path: "/auth/reset/:token",
        key: "AUTH_RESET",
        exact: true,
        component: ResetPassForm,
      },
    ],
  },
  {
    path: "/app",
    key: "APP",
    component: (props) => {
      return localStorage.getItem("NewState") ? (
        <RenderRoutes {...props} />
      ) : (
        <Redirect to={"/"} />
      );
    },
    routes: [
      {
        path: "/app/security",
        key: "APP_SECURITY",
        exact: true,
        component: AccountSecurity,
      },
      {
        path: "/app/cart",
        key: "APP_LOGIN",
        exact: true,
        component: ShoppingCart,
      },
    ],
  },
];

export default ROUTES;

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
