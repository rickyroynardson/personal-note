import React from "react";

const Button = (props) => {
  const theme = (() => {
    switch (props.theme) {
      default:
        return "bg-sky-500 text-white hover:bg-sky-600";
    }
  })();

  const weight = (() => {
    switch (props.weight) {
      case "semibold":
        return "font-semibold";
      default:
        return "font-normal";
    }
  })();

  const size = (() => {
    switch (props.size) {
      default:
        return "px-6 py-2.5";
    }
  })();

  return (
    <button
      type={props.type}
      className={`${theme} ${size} ${weight} h-fit rounded-lg transition-all duration-300 hover:shadow-lg`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
