import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BigBlock from "../components/BigBlock";
import Search from "../components/Search";
import Feed from "../components/Feed";

export default function Home() {
  const [activeScope, setActiveScope] = useState("global");
  const [searchQuery, setSearchQuery] = useState("");

  function content() {
    return (
      <>
        <div className="container align-self-start">
          <div className="row justify-content-center">
            <div
              className="col-5"
              style={{ borderBottom: "2px solid #000", height: "60px" }}
            >
              <h2 className="mt-3 ms-5" style={{ fontFamily: "SudoFont" }}>
                Feed
              </h2>
            </div>
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search repositories..."
            />
            <div
              className="col"
              style={{
                borderLeft:
                  activeScope === "global" ? "3px solid #000" : "none",
                borderRight: "2px solid #000",
                borderBottom:
                  activeScope === "local" ? "2px solid #000" : "none",
                height: "60px",
                cursor: "pointer",
              }}
              onClick={() => setActiveScope("global")}
            >
              <h3
                className="mt-3 text-center"
                style={{ fontFamily: "SudoFont" }}
              >
                Global
              </h3>
            </div>
            <div
              className="col"
              style={{
                borderBottom:
                  activeScope === "global" ? "2px solid #000" : "none",
                height: "60px",
                cursor: "pointer",
              }}
              onClick={() => setActiveScope("local")}
            >
              <h3
                className="mt-3 text-center"
                style={{ fontFamily: "SudoFont" }}
              >
                Local
              </h3>
            </div>
          </div>
          <div
            className="row justify-content-center mt-4"
            style={{ marginLeft: "35px" }}
          >
            <h3 style={{ fontFamily: "SudoFont" }}>Repositories</h3>
          </div>
          <div className="container">
            <div className="row">
              <Feed scope={activeScope} searchQuery={searchQuery} />
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
