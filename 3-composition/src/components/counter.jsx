import React from "react";

const Counter = ({ id, value, name, onIncrement, onDecrement, onDelete }) => {
  const formValue = () => {
    return value === 0 ? "Ноль" : value;
  };

  const getBageClasses = () => {
    let classes = "badge m-2 bg-";
    classes += value === 0 ? "danger" : "primary";
    return classes;
  };

  return (
    <>
      <h4>{name}</h4>
      <span className={getBageClasses()}>{formValue()}</span>
      <button
        onClick={() => onIncrement(id)}
        className="btn btn-secondary btn-sm"
      >
        Increment
      </button>
      <button
        onClick={() => onDecrement(id)}
        className="btn btn-secondary btn-sm"
      >
        Decriment
      </button>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </>
  );
};

export default Counter;
