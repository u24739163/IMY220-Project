import React from "react";

export default function InputField({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  required = false,
  className = "form-control",
  style = {},
  disabled = false,
  value,
  onChange,
}) {
  const defaultStyle = {
    fontFamily: "SudoFont",
    borderRadius: "60px",
    border: "3px solid #000",
    width: "80%",
    justifySelf: "center",
  };

  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="form-label"
        style={{ fontFamily: "SudoFont" }}
      >
        {label}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        className={className}
        placeholder={placeholder}
        required={required}
        style={{ ...defaultStyle, ...style }}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
