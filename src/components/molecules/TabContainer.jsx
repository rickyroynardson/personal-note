import React from "react";

const TabContainer = (props) => {
  return (
    <div className="flex gap-2 p-2 rounded-lg bg-white">{props.children}</div>
  );
};

export default TabContainer;
