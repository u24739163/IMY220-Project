import React from "react";
import { Link } from "react-router-dom";
import SmolBlock from "../components/SmolBlock";
import Button from "../components/Button";
export default function Splash() {
  function content() {
    return (
      <>
        <div className="container text-center">
          <div className="row">
            <h1
              style={{
                fontFamily: "SudoFont2",
                fontSize: "150px",
                textShadow: "4px 4px 6px rgba(0,0,0,0.6)",
                textAlign: "center",
              }}
            >
              SUDO REPO
            </h1>
          </div>
          <div className="row">
            <p
              style={{
                fontFamily: "SudoFont",
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Collaborate on code and projects with ease
            </p>
          </div>
          <div className="row">
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              style={{ gap: "16px", flexWrap: "wrap" }}
            >
              <Link
                to="/login"
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                <Button label="Login" />
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                <Button label="Sign Up" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <SmolBlock content={content()} />
        </div>
      </div>
    </>
  );
}
