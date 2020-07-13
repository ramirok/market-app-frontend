import React from "react";
import { Route, Switch } from "react-router-dom";

import NewArrivals from "./containers/NewArrivals/NewArrivals";
import TopSellers from "./containers/TopSellers/TopSellers";
import History from "./containers/History/History";
import Discover from "./containers/Discover/Discover";
import LoginForm from "./component/FormContainer/LoginForm/LoginForm";
import SignUpForm from "./component/FormContainer/SignUpForm/SignUpForm";
import ResetPassForm from "./component/FormContainer/ResetPassForm/ResetPassForm";
import ActivateForm from "./component/FormContainer/ActivateForm/ActivateForm";
import Category from "./containers/Category/Category";

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
        path: "/auth/reset/:token",
        key: "AUTH_RESET",
        exact: true,
        component: ResetPassForm,
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
