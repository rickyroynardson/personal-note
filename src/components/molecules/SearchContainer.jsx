import React from "react";

const SearchContainer = (props) => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row">{props.children}</div>
  );
};

export default SearchContainer;
