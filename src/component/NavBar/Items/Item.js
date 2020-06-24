import React, { useState } from "react";

import DropDownMenu from "../../UI/DropDownMenu/DropDownMenu";
import classes from "./Item.module.css";

const Item = (props) => {
  // Toggles dropDownMenu visibility onEnter and onLeave
  const [visible, setVisible] = useState(false);

  /*
Recives:
 -dropDownMenu item list
 -navbar item list
*/
  const { dropDownMenu, item } = props;

  return (
    <li className={classes.Item}>
      <span
        // Sets event if item recives dropDownMenu as props
        onMouseEnter={
          dropDownMenu
            ? () => {
                setVisible(true);
              }
            : null
        }
        // Sets event if item recives dropDownMenu as props
        onMouseLeave={
          dropDownMenu
            ? () => {
                setVisible(false);
              }
            : null
        }
      >
        {item}
      </span>
      {/* Renders dropDownMenu if item recives dropDownMenu as props */}
      {dropDownMenu && (
        <DropDownMenu
          {...dropDownMenu}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </li>
  );
};

export default Item;
