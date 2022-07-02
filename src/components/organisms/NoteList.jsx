import React, { Children, useEffect, useState } from "react";

const NoteList = (props) => {
  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    setHasChildren(Children.count(props.children) > 0);
  }, [props.children]);

  return <div>{hasChildren ? props.children : "Tidak ada catatan"}</div>;
};

export default NoteList;
