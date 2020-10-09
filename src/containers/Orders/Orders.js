import React, { useEffect, useState } from "react";

import { useUser } from "../../context/userContext";
import { fetchService } from "../../utils/fetchServices";
import Spinner from "../../component/UI/Spinner/Spinner";
import OrderCard from "../../component/UI/Card/OrderCard/OrderCard";
import classes from "./Orders.module.css";

const Orders = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // orders to show
  const [orders, setOrders] = useState([]);

  // loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loginData.token) {
      // fetch orders
      fetchService("get", "users/orders", loginData.token).then((data) => {
        // set orders if response is an array
        data instanceof Array && setOrders(data);
        setLoading(false);
      });
    }
  }, [loginData.token]);

  return (
    <>
      <div className={classes.Head}></div>
      <div className={classes.Container}>
        {loading ? (
          <div className={classes.SpinnerContainer}>
            <Spinner />
          </div>
        ) : orders.length > 0 ? (
          orders.map((el, index) => <OrderCard key={index} {...el} />)
        ) : (
          // if no orders:
          <div className={classes.NoOrders}>
            <p>No orders yet...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
