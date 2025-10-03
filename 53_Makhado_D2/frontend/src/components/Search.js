import React from "react";
import InputField from "./InputField";

export default function Search({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
}) {
  return (
    <div
      className="col-3"
      style={{ borderBottom: "2px solid #000", height: "60px" }}
    >
      <input
        id="search"
        placeholder={placeholder}
        className="form-control align-self-center mt-3 ms-4"
        style={{
          fontFamily: "SudoFont",
          borderRadius: "60px",
          border: "3px solid #000",
          width: "80%",
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </div>
  );
}
