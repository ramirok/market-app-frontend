import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../context/userContext";
import { capitalizeName } from "../../utils/helpers";
import Spinner from "../UI/Spinner/Spinner";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import DropDownItemLink from "../UI/DropDownMenu/DropDownItemLink/DropDownItemLink";
import classes from "./MyAccount.module.css";

// SVG imports
import { ReactComponent as Bell } from "../../assets/bell.svg";
import { ReactComponent as Orders } from "../../assets/myaccount/orders.svg";
import { ReactComponent as Security } from "../../assets/myaccount/security.svg";
import { ReactComponent as LogOut } from "../../assets/myaccount/logout.svg";
import { ReactComponent as ShoppingCart } from "../../assets/shopping-cart.svg";

const MyAccount = () => {
  //Toggles dropDownMenu visibility onClick and onLeave
  const [visible, setVisible] = useState(false);

  // loading state for logout spinner
  const [isLoading, setIsLoading] = useState(false);

  // logout handler
  const { handleLogout, loginData } = useUser();

  const history = useHistory();

  // DropDownMenu list items
  const svgStyle = { height: "2rem", width: "2rem" };
  const list = {
    Cart: <ShoppingCart style={svgStyle} />,
    Orders: <Orders style={svgStyle} />,
    Account: <Security style={svgStyle} />,
  };

  return (
    <div className={classes.MyAccountContainer}>
      <span
        className={classes.MyAccount}
        onClick={() => {
          setVisible(true);
        }}
        onMouseLeave={() => {
          setVisible(false);
        }}
      >
        My Account
      </span>
      <Bell className={classes.Bell} />

      <DropDownMenu visible={visible} setVisible={setVisible}>
        {/* shows a hello username message */}
        <div className={classes.Hello}>{`Hello ${capitalizeName(
          loginData.name.split(" ")[0]
        )}`}</div>

        {/* dropDownMenu links */}
        {Object.keys(list).map((el) => (
          <DropDownItemLink
            key={el}
            to={`/app/${el}`}
            img={list[el]}
            name={el}
          />
        ))}

        {/* Logout button */}
        <div
          className={classes.Logout}
          onClick={async () => {
            setIsLoading(true);
            await handleLogout();
            history.push("/");
          }}
        >
          Log Out
          <span>
            {isLoading ? <Spinner small /> : <LogOut style={svgStyle} />}
          </span>
        </div>
      </DropDownMenu>
    </div>
  );
};

export default MyAccount;
