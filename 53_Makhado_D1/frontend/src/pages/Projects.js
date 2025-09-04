import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BigBlock from "../components/BigBlock";
import Search from "../components/Search";
import ProjectsList from "../components/ProjectsList";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");

  function content() {
    return (
      <>
        <div className="container align-self-start">
          <div className="row justify-content-center">
            <div
              className="col-9"
              style={{ borderBottom: "2px solid #000", height: "60px" }}
            >
              <h2 className="mt-3 ms-4" style={{ fontFamily: "SudoFont" }}>
                My Projects
              </h2>
            </div>
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search projects..."
            />
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <ProjectsList searchQuery={searchQuery} />
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
