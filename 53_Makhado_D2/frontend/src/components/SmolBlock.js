import React from "react";
import "../../public/assets/css/block.css";

function SmolBlock({ content }) {
  return (
    <div className="smol-container">
      <div className="smol-rectangle smol-rectangle-1"></div>
      <div className="smol-rectangle smol-rectangle-2"></div>
      <div className="smol-rectangle smol-rectangle-3">
        <div style={{ width: "100%", height: "100%", padding: "20px" }}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default SmolBlock;
