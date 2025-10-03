import React from "react";

export default function File({
  fileData,
  onEdit,
  canEdit,
  onDownload,
  onDelete,
}) {
  const file = fileData || {
    id: 1,
    name: "Default File",
    commitMessage: "Initial commit",
    modified: "2023-01-01",
  };

  const getStatusStyles = () => {
    if (!file.status) return {};

    const isCheckedOut = file.status === "checked-out";
    return {
      backgroundColor: isCheckedOut ? "#ffebee" : "#e8f5e8",
      color: isCheckedOut ? "#c62828" : "#2e7d32",
      border: `1px solid ${isCheckedOut ? "#ffcdd2" : "#c8e6c9"}`,
    };
  };

  function renderFile() {
    console.log("File component debug:", {
      fileName: file.name,
      canEdit,
      onDelete: !!onDelete,
      fileStatus: file.status,
      shouldShowDelete: canEdit && onDelete && file.status === "checked-out",
    });

    return (
      <div
        className="row mb-3 p-3"
        style={{
          border: "2px solid #333",
          borderRadius: "12px",
          width: "100%",
          backgroundColor: "#fafafa",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >

        <div className="col-3 d-flex align-items-center">
          <div>
            <h5
              style={{
                fontFamily: "SudoFont",
                margin: 0,
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {file.name}
            </h5>
            {file.status && (
              <span
                style={{
                  fontSize: "10px",
                  fontFamily: "SudoFont",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  display: "inline-block",
                  marginTop: "4px",
                  ...getStatusStyles(),
                }}
              >
                {file.status}
              </span>
            )}
          </div>
        </div>

        <div className="col-3 d-flex align-items-center">
          <div>
            <p
              style={{
                fontFamily: "SudoFont",
                fontSize: "14px",
                margin: 0,
                color: "#555",
              }}
            >
              {file.commitMessage || `${file.type} file (${file.size})`}
            </p>
          </div>
        </div>

        <div className="col-3 d-flex align-items-center">
          <div>
            <p
              style={{
                fontFamily: "SudoFont",
                fontSize: "14px",
                margin: 0,
                color: "#555",
              }}
            >
              {file.upload_date || file.modified}
            </p>
            {file.version && (
              <small
                style={{
                  color: "#888",
                  backgroundColor: "#e9ecef",
                  padding: "2px 6px",
                  borderRadius: "8px",
                  fontWeight: "500",
                }}
              >
                v{file.version}
              </small>
            )}
          </div>
        </div>

        <div className="col-3 d-flex align-items-center justify-content-end gap-2">
          {canEdit && onEdit && (
            <button
              onClick={onEdit}
              style={{
                background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "6px 12px",
                cursor: "pointer",
                fontFamily: "SudoFont",
                fontSize: "11px",
                fontWeight: "600",
                color: "#333",
                transition: "all 0.2s ease",
              }}
              title="Edit File"
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e9ecef";
                e.target.style.borderColor = "#adb5bd";
              }}
              onMouseOut={(e) => {
                e.target.style.background =
                  "linear-gradient(145deg, #ffffff, #f0f0f0)";
                e.target.style.borderColor = "#ddd";
              }}
            >
              Edit
            </button>
          )}

          {canEdit && onDelete && file.status === "checked-out" && (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete "${file.name}"? This action cannot be undone.`
                  )
                ) {
                  onDelete();
                }
              }}
              style={{
                background: "linear-gradient(145deg, #ffebee, #ffcdd2)",
                border: "1px solid #f8bbd9",
                borderRadius: "6px",
                padding: "6px 12px",
                cursor: "pointer",
                fontFamily: "SudoFont",
                fontSize: "11px",
                fontWeight: "600",
                color: "#c62828",
                transition: "all 0.2s ease",
              }}
              title="Delete File"
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#ffcdd2";
                e.target.style.borderColor = "#f48fb1";
              }}
              onMouseOut={(e) => {
                e.target.style.background =
                  "linear-gradient(145deg, #ffebee, #ffcdd2)";
                e.target.style.borderColor = "#f8bbd9";
              }}
            >
              Delete
            </button>
          )}

          <img
            src="/assets/images/download.png"
            alt="Download"
            className="img-fluid"
            style={{
              height: "22px",
              width: "26px",
              cursor: "pointer",
              padding: "2px",
              borderRadius: "4px",
              transition: "all 0.2s ease",
            }}
            title="Download File"
            onClick={onDownload}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f8f9fa";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.transform = "scale(1)";
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="container d-flex flex-column align-items-center">
      {renderFile()}
    </div>
  );
}
