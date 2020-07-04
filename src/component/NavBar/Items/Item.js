import React, { useState } from "react";

import DropDownMenu from "../../UI/DropDownMenu/DropDownMenu";
import classes from "./Item.module.css";
import DropDownItemLink from "../../UI/DropDownMenu/DropDownItemLink/DropDownItemLink";

const Item = (props) => {
  // Toggles dropDownMenu visibility onEnter and onLeave
  const [visible, setVisible] = useState(false);

  /*
Recives:
 -dropDownMenu: items for the dropDownMenu
 -name: NavBar element name 
*/
  const { dropDownMenu, name } = props;

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
        {name}
      </span>
      {/* Renders dropDownMenu if item recives dropDownMenu as props */}
      {dropDownMenu && (
        <DropDownMenu visible={visible} setVisible={setVisible}>
          {Object.keys(dropDownMenu).map((el) => (
            <DropDownItemLink
              key={el}
              to={el}
              img={dropDownMenu[el]}
              name={el}
            />
          ))}
        </DropDownMenu>
      )}
    </li>
  );
};

export default Item;
