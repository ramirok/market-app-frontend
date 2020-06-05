import React from "react";
import classes from "./Item.module.css";

const Item = (props) => {
  return (
    <li className={classes.Item}>
      <span
        onMouseEnter={
          props.setOpen
            ? () => {
                props.setOpen(true);
                props.setMustClear(false);
              }
            : null
        }
        onMouseLeave={props.setOpen ? () => props.setMustClear(true) : null}
      >
        {props.item}
      </span>
      {props.open && props.children}
    </li>
  );
};

export default Item;
