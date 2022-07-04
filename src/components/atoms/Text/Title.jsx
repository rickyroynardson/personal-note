import React from "react";

const Title = (props) => {
  const size = (() => {
    switch (props.size) {
      case "2xl":
        return "text-2xl";
      default:
        return "text-xl";
    }
  })();

  return (
    <h1 className={`${props.color} ${size} font-semibold`}>{props.value}</h1>
  );
};

export default Title;
