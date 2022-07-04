import React, { useEffect, useState } from "react";

const Content = (props) => {
  const [content, setContent] = useState(props.value);
  const [full, setFull] = useState(false);

  useEffect(() => {
    full
      ? setContent(props.value)
      : setContent(props.value.split(" ").slice(0, 40).join(" "));
  }, [props.value, full]);

  return (
    <p className="text-base text-gray-800 font-normal leading-5 text-justify">
      {content}
      {props.value.split(" ").length > 40 ? (
        <>
          <button
            type="button"
            className="text-sky-800"
            onClick={() => setFull(!full)}
          >
            ...{full ? "Lihat lebih sedikit" : "Lihat selengkapnya"}
          </button>
        </>
      ) : (
        ""
      )}
    </p>
  );
};

export default Content;
