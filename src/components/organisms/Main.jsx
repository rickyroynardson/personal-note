import React from "react";

const Main = (props) => {
  return <main className="flex-grow overflow-y-auto">{props.children}</main>;
};

export default Main;
