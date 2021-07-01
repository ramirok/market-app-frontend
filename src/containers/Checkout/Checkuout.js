import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import { fetchService } from "../../utils/fetchServices";
import { capitalizeName } from "../../utils/helpers";
import Button from "../../component/Button/Button";
import FormContainer from "../../component/FormContainer/FormContainer";
import Spinner from "../../component/UI/Spinner/Spinner";
import classes from "./Checkout.module.css";

const Checkout = () => {
  // customHook for user context:
  // loginData returns ={name, email, token}
  const { loginData } = useUser();

  // customHook for cart context
  // cartItems = [array of items]
  // resetCart : reset cart on purchase aprove
  // loaded: cart has been loaded
  const { cartItems, loaded, resetCart } = useCart();

  // state for congratulations message
  const [paidFor, setPaidFor] = useState(false);

  // state for error message
  const [error, setError] = useState(false);

  // state for when info is incomplet
  const [infoIncomplete, setInfoIncomplete] = useState(true);

  // loading state for spinner
  const [loading, setLoading] = useState(true);

  // reference for paypal button
  let paypalRef = useRef();

  // calculate cart total
  const total =
    cartItems.length > 0
      ? cartItems
          .map((el) => el.price * el.quantity)
          .reduce((acc, cur) => acc + cur)
          .toFixed(2)
      : null;

  const history = useHistory();

  useEffect(() => {
    // check if user has personal info and address completed
    if (loginData.token && loaded) {
      fetchService({
        method: "get",
        url: "users/user-details",
        token: loginData.token,
      }).then((data) => {
        if (data.infoCompleted && data.addressCompleted) {
          setInfoIncomplete(false);
        } else {
          setLoading(loginData.token ? false : true);
        }
      });

      // if paidfor=false , error=false and info is completed, load the script and render the button
      if (!paidFor && !error && !infoIncomplete) {
        const script = document.createElement("script");
        script.src =
          "https://www.paypal.com/sdk/js?client-id=AfDyAFundVVqCD-SQLf583QoeZsuJI6ocD9GxyiODndW2jAB9IuNS8ET_1g4NjEpoUUdRH82OF2uQLRT";
        document.body.appendChild(script);

        // add event for script finish loading
        script.addEventListener("load", () => {
          setLoading(false);
          // if the are items in the cart, renders paypal button
          if (cartItems.length > 0) {
            window.paypal
              .Buttons({
                style: {
                  shape: "pill",
                  color: "blue",
                  layout: "vertical",
                  label: "paypal",
                },
                createOrder: async () => {
                  const response = await fetchService({
                    method: "post",
                    url: "users/purchase-aproved",
                    token: loginData.token,
                  });
                  return response.orderID;
                },
                onApprove: async (data, actions) => {
                  setLoading(true);
                  const response = await resetCart(
                    loginData.token,
                    data.orderID
                  );
                  response ? setPaidFor(true) : setError(true);
                },
                onError: (error) => {
                  setError(true);
                },
              })
              .render(paypalRef.current);
            document.getElementById("spinner").style.display = "none";
            document.getElementById("summary-container").style.display =
              "block";
          }
        });
      }
    }
  }, [
    paidFor,
    cartItems,
    loginData.token,
    error,
    resetCart,
    infoIncomplete,
    history,
    loaded,
  ]);

  // render paypal button
  let toRender = (
    <>
      <div id="spinner">
        <Spinner />
      </div>

      <div style={{ borderBottom: "1px solid #cccccc", marginBottom: "1rem" }}>
        <p>Demo Paypal Account:</p>
        <p style={{ color: "red" }}>mkbuy@personal.example.com</p>
        <p style={{ color: "red" }}>pass: marketappbuy</p>
      </div>

      <div id="summary-container" style={{ display: "none" }}>
        <h3 style={{ marginBottom: "1rem" }}>Checkout summary</h3>

        {cartItems.map((el) => (
          <div key={el.name} className={classes.ItemContainer}>
            <div className={classes.ImageContainer}>
              <img src={`/${el.img}`} alt={el.name} width="50px" />
            </div>
            <div className={classes.ItemDescription}>
              <p>{capitalizeName(el.name)}</p>
              <p>
                $ {el.price} x{el.quantity}
              </p>
              <p className={classes.PriceItemTotal}>
                $ {(el.price * el.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
        <h4 className={classes.PriceTotal}>Total: $ {total}</h4>

        {/* paypal button */}
        <div ref={paypalRef} />
      </div>
    </>
  );

  // if error, returns error message
  if (error) {
    toRender = (
      <>
        <p style={{ marginBottom: "1rem" }}>
          Something went wrong, please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Ok</Button>
      </>
    );
  }

  // if paidFor = true, return succeed message
  if (paidFor) {
    toRender = (
      <>
        <h3 style={{ marginBottom: "1rem" }}>Congratulations</h3>
        <p style={{ marginBottom: "2rem" }}>Your order has been placed.</p>
        <Button onClick={() => history.push("/app/orders")}>
          Check orders
        </Button>
      </>
    );
  }

  // if infoIncomplete = true, return redirect to settings button
  if (infoIncomplete) {
    toRender = (
      <>
        <p style={{ marginBottom: "1rem" }}>
          Please complete your personal information and address in account
          settings.
        </p>
        <Button onClick={() => history.push("/app/account")}>Ok</Button>
      </>
    );
  }

  return (
    <FormContainer>
      {loading ? (
        <span style={{ margin: "0 auto" }}>
          <Spinner />
        </span>
      ) : (
        toRender
      )}
    </FormContainer>
  );
};

export default Checkout;
