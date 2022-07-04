import React from "react";

const ModalCard = (props) => {
  return (
    <div className="w-full max-w-lg bg-white p-4 rounded-lg flex flex-col gap-5">
      {props.children}
    </div>
  );
};

export default ModalCard;
