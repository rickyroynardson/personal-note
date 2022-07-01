import React from "react";

const Layout = (props) => {
  return (
    <div className="w-screen h-screen px-5 py-4 bg-slate-50">
      <div className="w-full h-full max-w-3xl mx-auto">{props.children}</div>
    </div>
  );
};

export default Layout;
