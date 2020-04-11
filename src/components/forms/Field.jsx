import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  idNumber,
  className = "",
  type = "text",
  minlength = 2,
  required = false,
}) => {
  return (
    <div className="field">
      <label htmlFor={idNumber}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className={className}
        placeholder={placeholder}
        name={name}
        id={idNumber}
        required={required}
        minLength={minlength}
      />
    </div>
  );
};

export default Field;
