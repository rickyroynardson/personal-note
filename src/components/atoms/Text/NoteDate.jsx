import React from "react";

const NoteDate = (props) => {
  return (
    <p className="text-base text-gray-500 font-light leading-4">
      {props.value}
    </p>
  );
};

export default NoteDate;
