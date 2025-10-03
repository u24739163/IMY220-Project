import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BigBlock from "../components/BigBlock";
import ProjectsList from "../components/ProjectsList";
import ProjectCreateForm from "../components/ProjectCreateForm";
import Button from "../components/Button";

export default function Projects() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(0);

  const handleProjectCreated = (project) => {
    setShowCreateForm(false);
    setRefreshProjects((prev) => prev + 1);
  };

  function content() {
    if (showCreateForm) {
      return (
        <ProjectCreateForm
          onProjectCreated={handleProjectCreated}
          onCancel={() => setShowCreateForm(false)}
        />
      );
    }

    return (
      <>
        <div className="container align-self-start">
          <div className="row justify-content-center">
            <div
              className="col-7"
              style={{ borderBottom: "2px solid #000", height: "60px" }}
            >
              <h2 className="mt-3 ms-4" style={{ fontFamily: "SudoFont" }}>
                My Projects
              </h2>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <Button
                label="New Project"
                onClick={() => setShowCreateForm(true)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <ProjectsList refreshTrigger={refreshProjects} />
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
