import React from "react";

export default function Button({ label, onClick, type = "button" }) {
  return (
    <button onClick={onClick} className="custom-button" type={type}>
      <span className="rectangle" aria-hidden="true" />
      <span className="circle1" aria-hidden="true" />
      <span className="circle2" aria-hidden="true" />
      <span className="label" style={{ fontFamily: "SudoFont" }}>
        {label}
      </span>
    </button>
  );
}
