import React from "react";
import Navbar from "../components/Navbar";
import BigBlock from "../components/BigBlock";
import File from "../components/File";
import Button from "../components/Button";

export default function Project() {
  var projectData = {
    id: 1,
    title: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/images/imagePlaceholder.jpg",
    type: "Web Development",
    tags: ["HTML", "CSS", "JavaScript"],
    version: "1.0.0",
    creationDate: "2023-10-01",
    collaborators: ["Alice", "Bob", "Charlie"],
  };

  function content() {
    return (
      <>
        <div className="container align-self-start">
          <div className="row" style={{ minHeight: "600px" }}>
            {/* Left Sidebar - Project Information */}
            <div
              className="col-3 pe-4"
              style={{ borderRight: "2px solid #000" }}
            >
              <div
                className="ps-2 mt-3 pb-3"
                style={{ borderBottom: "2px solid #000" }}
              >
                <h3
                  className="ms-2"
                  style={{ fontFamily: "SudoFont", fontWeight: "600" }}
                >
                  Project Information
                </h3>
              </div>

              <div
                className="ps-2 mt-3 pb-2"
                style={{ borderBottom: "1px solid #eee" }}
              >
                <h6
                  style={{
                    fontFamily: "SudoFont",
                    fontWeight: "600",
                    color: "#555",
                    marginBottom: "4px",
                  }}
                >
                  Type
                </h6>
                <p
                  style={{
                    fontFamily: "SudoFont",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {projectData.type}
                </p>
              </div>

              <div
                className="ps-2 mt-2 pb-2"
                style={{ borderBottom: "1px solid #eee" }}
              >
                <h6
                  style={{
                    fontFamily: "SudoFont",
                    fontWeight: "600",
                    color: "#555",
                    marginBottom: "4px",
                  }}
                >
                  Tags
                </h6>
                <div className="d-flex flex-wrap gap-1">
                  {projectData.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        fontFamily: "SudoFont",
                        fontSize: "12px",
                        backgroundColor: "#f0f0f0",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        border: "1px solid #ddd",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="ps-2 mt-2 pb-2"
                style={{ borderBottom: "1px solid #eee" }}
              >
                <h6
                  style={{
                    fontFamily: "SudoFont",
                    fontWeight: "600",
                    color: "#555",
                    marginBottom: "4px",
                  }}
                >
                  Version
                </h6>
                <p
                  style={{
                    fontFamily: "SudoFont",
                    fontSize: "14px",
                    margin: 0,
                    opacity: 0.8,
                  }}
                >
                  v{projectData.version}
                </p>
                <small
                  style={{
                    fontFamily: "SudoFont",
                    fontSize: "12px",
                    opacity: 0.6,
                  }}
                >
                  Created: {projectData.creationDate}
                </small>
              </div>

              <div className="ps-2 mt-2 pb-2">
                <h6
                  style={{
                    fontFamily: "SudoFont",
                    fontWeight: "600",
                    color: "#555",
                    marginBottom: "4px",
                  }}
                >
                  Collaborators
                </h6>
                <div className="d-flex flex-wrap gap-1">
                  {projectData.collaborators.map((collab, index) => (
                    <span
                      key={index}
                      style={{
                        fontFamily: "SudoFont",
                        fontSize: "12px",
                        backgroundColor: "#e8f4fd",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        border: "1px solid #b3d9f2",
                      }}
                    >
                      {collab}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ps-2 mt-4">
                <div className="mb-3">
                  <Button
                    label="Create File"
                    onClick={() => console.log("Create File clicked")}
                  />
                </div>
                <div>
                  <Button
                    label="Edit Project"
                    onClick={() => console.log("Edit clicked")}
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col mt-2">
              {/* Project Header */}
              <div
                className="row align-items-center pb-3"
                style={{ borderBottom: "2px solid #000" }}
              >
                <div className="col-2">
                  <img
                    src={projectData.image}
                    alt="Project"
                    className="img-fluid"
                    style={{
                      borderRadius: "60px",
                      height: "70px",
                      width: "70px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-6">
                  <h2
                    style={{
                      fontFamily: "SudoFont",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    {projectData.title}
                  </h2>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-end gap-2">
                  <img
                    src="/assets/images/download.png"
                    alt="Download"
                    className="img-fluid"
                    style={{
                      height: "30px",
                      width: "35px",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <span
                    style={{
                      fontFamily: "SudoFont",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Download Project
                  </span>
                </div>
              </div>

              {/* Description */}
              <div
                className="row mt-4 pb-3"
                style={{ borderBottom: "2px solid #000" }}
              >
                <div className="col">
                  <h5
                    style={{
                      fontFamily: "SudoFont",
                      fontWeight: "600",
                      color: "#555",
                      marginBottom: "12px",
                    }}
                  >
                    Description
                  </h5>
                  <p
                    style={{
                      fontFamily: "SudoFont",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      backgroundColor: "#f8f9fa",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid #eee",
                    }}
                  >
                    {projectData.description}
                  </p>
                </div>
              </div>

              {/* Files Section */}
              <div className="row mt-4">
                <div className="col">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5
                      style={{
                        fontFamily: "SudoFont",
                        fontWeight: "600",
                        color: "#555",
                        margin: 0,
                      }}
                    >
                      Files
                    </h5>
                    <span
                      style={{
                        fontFamily: "SudoFont",
                        fontSize: "12px",
                        color: "#666",
                        backgroundColor: "#f0f0f0",
                        padding: "4px 12px",
                        borderRadius: "12px",
                      }}
                    >
                      {projectData.tags.length} files
                    </span>
                  </div>
                  <File />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <Navbar />
        </div>
        <div className="row justify-content-center">
          <BigBlock content={content()} />
        </div>
      </div>
    </>
  );
}
