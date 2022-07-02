import React from "react";

const Header = (props) => {
  return (
    <header className="w-full bg-white p-4 rounded-lg">{props.children}</header>
  );
};

export default Header;
