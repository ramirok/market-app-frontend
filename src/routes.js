import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./containers/HomePage/HomePage";
import LoginForm from "./component/FormContainer/LoginForm/LoginForm";
import SignUpForm from "./component/FormContainer/SignUpForm/SignUpForm";
import ForgotPassForm from "./component/FormContainer/ForgotPassForm/ForgotPassForm";
import ResetPassForm from "./component/FormContainer/ResetPassForm/ResetPassForm";
import ActivateForm from "./component/FormContainer/ActivateForm/ActivateForm";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import AccountSecurity from "./containers/AccountSecurity/AccountSecurity";
import ShoppingCart from "./containers/ShoppingCart/ShoppingCart";
import GoogleForm from "./component/FormContainer/GoogleForm/GoogleForm";
import ChangePass from "./component/FormContainer/ChangePassForm/ChangePassForm";
import Checkout from "./containers/Checkout/Checkuout";
import Orders from "./containers/Orders/Orders";
import page404 from "./containers/page404/page404";

// Lazy Loads
// const LoginForm = lazy(() =>
//   import("./component/FormContainer/LoginForm/LoginForm")
// );
// const SignUpForm = lazy(() =>
//   import("./component/FormContainer/SignUpForm/SignUpForm")
// );
// const ForgotPassForm = lazy(() =>
//   import("./component/FormContainer/ForgotPassForm/ForgotPassForm")
// );
// const ResetPassForm = lazy(() =>
//   import("./component/FormContainer/ResetPassForm/ResetPassForm")
// );
// const ActivateForm = lazy(() =>
//   import("./component/FormContainer/ActivateForm/ActivateForm")
// );
// const CategoryPage = lazy(() =>
//   import("./containers/CategoryPage/CategoryPage")
// );
// const AccountSecurity = lazy(() =>
//   import("./containers/AccountSecurity/AccountSecurity")
// );
// const ShoppingCart = lazy(() =>
//   import("./containers/ShoppingCart/ShoppingCart")
// );
// const GoogleForm = lazy(() =>
//   import("./component/FormContainer/GoogleForm/GoogleForm")
// );
// const ChangePass = lazy(() =>
//   import("./component/FormContainer/ChangePassForm/ChangePassForm")
// );
// const Checkout = lazy(() => import("./containers/Checkout/Checkuout"));
// const Orders = lazy(() => import("./containers/Orders/Orders"));

const ROUTES = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: HomePage,
  },
  { path: "/category/:cat", key: "CAT", exact: true, component: CategoryPage },
  {
    path: "/auth/reset/:token",
    key: "AUTH_RESET",
    exact: true,
    component: ResetPassForm,
  },
  {
    path: "/auth",
    key: "AUTH",
    // component: RenderRoutes,
    component: (props) => {
      return localStorage.getItem("NewState") ? (
        <Redirect to={"/"} />
      ) : (
        <RenderRoutes {...props} />
      );
    },

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
        path: "/auth/google",
        key: "AUTH_GOOGLE",
        exact: true,
        component: GoogleForm,
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
        path: "/app/account",
        key: "APP_ACCOUNT",
        exact: true,
        component: AccountSecurity,
      },
      {
        path: "/app/security/change",
        key: "APP_CHANGE",
        exact: true,
        component: ChangePass,
      },
      {
        path: "/app/cart",
        key: "APP_CART",
        exact: true,
        component: ShoppingCart,
      },
      {
        path: "/app/checkout",
        key: "APP_CHECKOUT",
        exact: true,
        component: Checkout,
      },
      {
        path: "/app/orders",
        key: "APP_ORDERS",
        exact: true,
        component: Orders,
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
      <Route component={page404} />
    </Switch>
  );
}
