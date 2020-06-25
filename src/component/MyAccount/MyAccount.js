import React, { useState } from "react";

import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./MyAccount.module.css";

// SVG imports
import { ReactComponent as Bell } from "../../assets/bell.svg";
import { ReactComponent as Account } from "../../assets/myaccount/myaccount.svg";
import { ReactComponent as Orders } from "../../assets/myaccount/orders.svg";
import { ReactComponent as Security } from "../../assets/myaccount/security.svg";
import { ReactComponent as LogOut } from "../../assets/myaccount/logout.svg";

import DropDownItemLink from "../UI/DropDownMenu/DropDownItemLink/DropDownItemLink";
const MyAccount = () => {
  //Toggles dropDownMenu visibility onClick and onLeave
  const [visible, setVisible] = useState(false);

  // DropDownMenu list items
  const svgStyle = { height: "2rem", width: "2rem" };
  const list = {
    "Your Account": <Account style={svgStyle} />,
    "Your Orders": <Orders style={svgStyle} />,
    Security: <Security style={svgStyle} />,
    "Log Out": <LogOut style={svgStyle} />,
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
        {Object.keys(list).map((el) => (
          <DropDownItemLink key={el} to={el} img={list[el]} name={el} />
        ))}
      </DropDownMenu>
    </div>
  );
};

export default MyAccount;
