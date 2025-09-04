import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  // const handleLogoutClick = () => {
  //   // Add padding-top to body
  //   document.body.style.paddingTop = "40px"; // or whatever your navbar height is
  //   console.log("Logout clicked: body padding-top set");
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            style={{ height: "40px" }}
          />
        </Link>

        {/* Hamburger toggle button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ fontFamily: "SudoFont" }}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ fontFamily: "SudoFont" }}
                to="/projects"
              >
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ fontFamily: "SudoFont" }}
                to="/profile"
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ fontFamily: "SudoFont" }}
                to="/logout"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
