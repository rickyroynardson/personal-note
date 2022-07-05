import React from "react";

const Layout = (props) => {
  return (
    <div className="w-screen h-screen overflow-hidden px-5 py-3 bg-slate-200">
      <div className="w-full h-full max-w-3xl mx-auto flex flex-col gap-2">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
