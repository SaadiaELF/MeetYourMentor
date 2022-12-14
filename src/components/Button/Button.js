import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button className={"btn btn--" + props.variant} onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

export default Button;
