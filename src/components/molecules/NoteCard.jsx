import React from "react";

const NoteCard = (props) => {
  return (
    <div className="w-full inline-flex flex-col p-4 mb-4 rounded border-l-4 border-sky-400 bg-white">
      {props.children}
    </div>
  );
};

export default NoteCard;
