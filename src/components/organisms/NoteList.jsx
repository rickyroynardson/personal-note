import React, { Children, useEffect, useState } from "react";

const NoteList = (props) => {
  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    setHasChildren(Children.count(props.children) > 0);
  }, [props.children]);

  return (
    <div className={`columns-1 sm:columns-2 gap-4 pr-4`}>
      {hasChildren ? props.children : "Tidak ada catatan"}
    </div>
  );
};

export default NoteList;
