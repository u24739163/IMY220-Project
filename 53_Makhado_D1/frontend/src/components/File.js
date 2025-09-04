import React from "react";

export default function File() {
  var files = [
    {
      id: 1,
      name: "File 1",
      commitMessage: "Initial commit",
      modified: "2023-01-01",
    },
    {
      id: 2,
      name: "File 2",
      commitMessage: "Added new feature",
      modified: "2023-01-02",
    },
    {
      id: 3,
      name: "File 3",
      commitMessage: "Fixed bugs",
      modified: "2023-01-03",
    },
    {
      id: 4,
      name: "File 4",
      commitMessage: "Refactored code",
      modified: "2023-01-04",
    },
    {
      id: 5,
      name: "File 5",
      commitMessage: "Updated documentation",
      modified: "2023-01-05",
    },
  ];
  function IndivFile({ file }) {
    return (
      <div
        className="row mb-2"
        style={{ border: "2px solid #000", borderRadius: "60px", width: "90%" }}
      >
        <div className="col d-flex align-items-center justify-content-center">
          <h5 style={{ fontFamily: "SudoFont" }}>{file.name}</h5>
        </div>
        <div className="col-5 d-flex align-items-center justify-content-center">
          <p style={{ fontFamily: "SudoFont", fontSize: "14px", opacity: 0.7 }}>
            {file.commitMessage}
          </p>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <p style={{ fontFamily: "SudoFont", fontSize: "14px", opacity: 0.7 }}>
            {file.modified}
          </p>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <img
            src="/assets/images/download.png"
            alt="Download"
            className="img-fluid"
            style={{
              height: "20px",
              width: "25px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="container d-flex flex-column align-items-center">
      {files.map((file) => (
        <IndivFile key={file.id} file={file} />
      ))}
    </div>
  );
}
