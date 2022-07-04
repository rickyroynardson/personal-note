import React from "react";

const Input = (props) => {
  return (
    <input
      type={props.type}
      className={`bg-slate-100 px-4 py-2.5 outline-none border border-transparent rounded-lg text-base text-gray-700 placeholder:text-gray-500 focus:border-sky-500`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      autoComplete={"off"}
      required={props.required}
    />
  );
};

export default Input;
