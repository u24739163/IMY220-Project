import React from "react";
import "../../public/assets/css/block.css";

function BigBlock({ content }) {
  return (
    <div className="big-container">
      <div className="big-rectangle big-rectangle-1"></div>
      <div className="big-rectangle big-rectangle-2"></div>
      <div className="big-rectangle big-rectangle-3">
        <div style={{ width: "100%", height: "100%", padding: "20px" }}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default BigBlock;
