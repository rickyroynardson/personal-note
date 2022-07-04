import React from "react";
import { Content, NoteDate, Title } from "../atoms";

const NoteBody = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <Title color="text-slate-800" size="2xl" value={props.title} />
        <NoteDate value={props.date} />
      </div>
      <Content value={props.body} />
    </div>
  );
};

export default NoteBody;
