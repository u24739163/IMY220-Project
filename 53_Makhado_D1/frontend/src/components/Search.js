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
      <InputField
        id="search"
        placeholder={placeholder}
        className="align-self-center mt-3 ms-4"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </div>
  );
}
