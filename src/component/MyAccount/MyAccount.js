import React, { useState } from "react";

import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./MyAccount.module.css";

const MyAccount = () => {
  const [visible, setVisible] = useState(false);
  const [mustClear, setMustClear] = useState(false);
  return (
    <span
      className={classes.MyAccount}
      onMouseEnter={() => {
        setMustClear(false);
        setVisible(true);
      }}
      onMouseLeave={() => {
        setMustClear(true);
      }}
    >
      My Account
      <DropDownMenu
        list={["Your Account", "Your Orderds", "Security", "Log Out"]}
        visible={visible}
        mustClear={mustClear}
        setMustClear={setMustClear}
        setVisible={setVisible}
      />
    </span>
  );
};

export default MyAccount;
