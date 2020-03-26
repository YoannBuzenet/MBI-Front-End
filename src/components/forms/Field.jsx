import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  idNumber,
  className = "",
  type = "text"
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
      />
    </div>
  );
};

export default Field;
