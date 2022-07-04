import React from "react";

const Textarea = (props) => {
  return (
    <textarea
      placeholder={props.placeholder}
      rows={props.rows}
      className={`bg-slate-100 px-4 py-2.5 outline-none border border-transparent rounded-lg text-base text-gray-700 placeholder:text-gray-500 focus:border-sky-500`}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      required={props.required}
    ></textarea>
  );
};

export default Textarea;
