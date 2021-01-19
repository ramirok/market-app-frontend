import React, { useState } from "react";

import DropDownMenu from "../../UI/DropDownMenu/DropDownMenu";
import classes from "./Item.module.css";
import DropDownItemLink from "../../UI/DropDownMenu/DropDownItemLink/DropDownItemLink";

const Item = (props) => {
  // toggles dropDownMenu visibility onEnter and onLeave
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
        style={{ cursor: "pointer" }}
        // Sets onClick, onMouseEnter and onMouseLeave events if item recives dropDownMenu as props
        onClick={() => (dropDownMenu ? setVisible(!visible) : null)}
        onMouseEnter={
          dropDownMenu
            ? () => {
                setVisible(true);
              }
            : null
        }
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

      {/* renders dropDownMenu if item recives dropDownMenu as props */}
      {dropDownMenu && (
        <DropDownMenu visible={visible} setVisible={setVisible}>
          {Object.keys(dropDownMenu).map((el) => (
            <DropDownItemLink
              key={el}
              to={`/category/${el}`}
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
