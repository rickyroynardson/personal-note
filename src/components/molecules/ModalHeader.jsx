import React from "react";

const ModalHeader = (props) => {
  return (
    <div className="flex items-center justify-between">{props.children}</div>
  );
};

export default ModalHeader;
