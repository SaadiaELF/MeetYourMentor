import React from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
  return (
    <div className="dropdown">
      <label className="dropdown-label" htmlFor={props.name}>
        Select a {props.option}
      </label>

      <select
        onChange={props.onChange}
        className="dropdown-select"
        name={props.name}
        id={props.id}
        value={props.value}
      >
        <option className="option" key="-1" value="-1" defaultValue>
          Select a {props.option}
        </option>
        {props.options.map((item, index) => {
          return (
            <option
              className="option"
              key={index}
              value={typeof item == "object" ? `${item.id}` : item}
            >
              {typeof item == "object"
                ? `${item.firstName} ${item.lastName}`
                : item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
