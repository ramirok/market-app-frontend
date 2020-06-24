import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import signupReducer from "./store/reducers/signup";
import cartReducer from "./store/reducers/cart";
import App from "./App";
import "./index.css";

const rootReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  // </React.StrictMode>
  document.getElementById("root")
);
