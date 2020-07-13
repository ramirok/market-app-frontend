import React, { useState } from "react";

import { useUser } from "../../context/userContext";
import { capitalizeName } from "../../utils/helpers";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import DropDownItemLink from "../UI/DropDownMenu/DropDownItemLink/DropDownItemLink";
import classes from "./MyAccount.module.css";

// SVG imports
import { ReactComponent as Bell } from "../../assets/bell.svg";
import { ReactComponent as Orders } from "../../assets/myaccount/orders.svg";
import { ReactComponent as Security } from "../../assets/myaccount/security.svg";
import { ReactComponent as LogOut } from "../../assets/myaccount/logout.svg";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

const MyAccount = () => {
  //Toggles dropDownMenu visibility onClick and onLeave
  const [visible, setVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // logout handler
  const { handleLogout, loginData } = useUser();

  // DropDownMenu list items
  const svgStyle = { height: "2rem", width: "2rem" };
  const list = {
    // "Your Account": <Account style={svgStyle} />,
    "Your Orders": <Orders style={svgStyle} />,
    Security: <Security style={svgStyle} />,
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
        <div className={classes.Hello}>{`Hello ${capitalizeName(
          loginData.name.split(" ")[0]
        )}`}</div>
        {Object.keys(list).map((el) => (
          <DropDownItemLink key={el} to={el} img={list[el]} name={el} />
        ))}
        {/* Logout button */}
        <div
          className={classes.Logout}
          onClick={() => {
            setIsLoading(true);
            handleLogout();
          }}
        >
          Log Out
          <span>
            {isLoading ? (
              <Spinner
                stroke="black"
                strokeWidth="5"
                style={{
                  position: "absolute",
                  transform: "translate(-50%,-50%)",
                  height: "2.5rem",
                  width: "2.5rem",
                }}
              />
            ) : (
              <LogOut style={svgStyle} />
            )}
          </span>
        </div>
      </DropDownMenu>
    </div>
  );
};

export default MyAccount;
