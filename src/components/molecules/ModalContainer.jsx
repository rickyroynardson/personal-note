import React from "react";

const ModalContainer = (props) => {
  return (
    <div
      className={`${
        props.visible ? "grid place-items-center" : "hidden"
      } w-screen h-screen fixed top-0 left-0 bg-gray-900 bg-opacity-30`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
    >
      {props.children}
    </div>
  );
};

export default ModalContainer;
