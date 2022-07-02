import React from "react";

const Tab = (props) => {
  const isActive = (() => {
    return props.active ? "bg-sky-500 text-white" : "hover:bg-gray-200";
  })();

  return (
    <button
      type={props.type}
      className={`${isActive} w-full h-fit px-6 py-2.5 font-semibold rounded-lg transition-all duration-300 hover:shadow`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Tab;
