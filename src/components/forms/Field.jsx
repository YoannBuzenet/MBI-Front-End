import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className={""}
        placeholder={placeholder}
        name={name}
        id={name}
      />
    </div>
  );
};

export default Field;
