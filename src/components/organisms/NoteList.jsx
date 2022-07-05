import React, { Children, useEffect, useState } from "react";
import { Message } from "../atoms";

const NoteList = (props) => {
  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    setHasChildren(Children.count(props.children) > 0);
  }, [props.children]);

  return (
    <div
      className={`${
        hasChildren
          ? "columns-1 sm:columns-2 gap-4 pr-4"
          : "grid place-items-center h-full"
      }`}
    >
      {hasChildren ? props.children : <Message value="Tidak ada catatan" />}
    </div>
  );
};

export default NoteList;
