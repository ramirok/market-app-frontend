import React from "react";
import classes from "./Item.module.css";

const Item = (props) => {
  const { setVisible, setMustClear } = props;

  return (
    <li className={classes.Item}>
      <span
        onMouseEnter={
          setVisible
            ? () => {
                setMustClear(false);
                setVisible(true);
              }
            : null
        }
        onMouseLeave={
          setMustClear
            ? () => {
                setMustClear(true);
              }
            : null
        }
      >
        {props.item}
      </span>
      {props.children}
    </li>
  );
};

export default Item;
