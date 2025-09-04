import React from "react";
import "../../public/assets/css/block.css";

function MedBlock({ content }) {
  return (
    <div className="med-container">
      <div className="med-rectangle med-rectangle-1"></div>
      <div className="med-rectangle med-rectangle-2"></div>
      <div className="med-rectangle med-rectangle-3">
        <div style={{ width: "100%", height: "100%", padding: "20px" }}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default MedBlock;
