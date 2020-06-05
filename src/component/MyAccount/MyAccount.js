import React, { useState } from "react";

import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import classes from "./MyAccount.module.css";

const MyAccount = () => {
  const [open, setOpen] = useState(false);
  return (
    <span className={classes.MyAccount} onMouseEnter={() => setOpen(true)}>
      My Account
      {open && (
        <DropDownMenu
          list={["Your Account", "Your Orderds", "Security", "Log Out"]}
          setOpen={setOpen}
        />
      )}
    </span>
  );
};

export default MyAccount;
