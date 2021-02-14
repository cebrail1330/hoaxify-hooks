import React from "react";

const Input = (props) => {
  const { label, error, name, onChange, type } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        className={className}
        name={name}
        onChange={onChange}
      ></input>
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

export default Input;
