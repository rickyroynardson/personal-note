import React from "react";

const Form = (props) => {
  return (
    <form className={props.class} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default Form;
