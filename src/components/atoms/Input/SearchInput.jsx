import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = (props) => {
  return (
    <label className="flex flex-grow gap-2 items-center px-4 py-2.5 h-fit bg-white border rounded-lg cursor-text transition-all duration-300 focus-within:border-sky-500">
      <FiSearch className="text-gray-700 text-xl" />
      <input
        type={props.type}
        className="flex-grow bg-transparent outline-none text-base text-gray-700 placeholder:text-gray-500"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoComplete={"off"}
      />
    </label>
  );
};

export default SearchInput;
