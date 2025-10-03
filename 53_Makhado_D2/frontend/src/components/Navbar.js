import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, searchAPI } from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    users: [],
    projects: [],
    activities: [],
  });
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isLoggedIn = !!currentUser;

  async function handleLogout() {
    try {
      await authAPI.signOut();
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      setSearchResults({ users: [], projects: [], activities: [] });
      setShowResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function performSearch() {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);

      const results = await Promise.all([
        searchAPI.searchUsers(searchQuery),
        searchAPI.searchProjects(searchQuery),
        searchAPI.searchActivities(searchQuery),
      ]);

      setSearchResults({
        users: (results[0] || []).slice(0, 3), // Limit to 3 results each
        projects: (results[1] || []).slice(0, 3),
        activities: (results[2] || []).slice(0, 3),
      });
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults({ users: [], projects: [], activities: [] });
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  function handleResultClick() {
    setShowResults(false);
    setSearchQuery("");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/assets/images/logo.png"
            alt="Logo"
            style={{ height: "40px" }}
          />
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          {isLoggedIn && (
            <div
              className="mx-auto position-relative"
              style={{ width: "400px" }}
            >
              <input
                ref={searchRef}
                type="text"
                className="form-control"
                placeholder="Search users, projects, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowResults(true)}
                style={{
                  fontFamily: "SudoFont",
                  borderRadius: "25px",
                  border: "2px solid #000",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              />

              {showResults &&
                (searchResults.users.length > 0 ||
                  searchResults.projects.length > 0 ||
                  searchResults.activities.length > 0 ||
                  loading) && (
                  <div
                    ref={resultsRef}
                    className="position-absolute bg-white border shadow-lg"
                    style={{
                      top: "100%",
                      left: "0",
                      right: "0",
                      borderRadius: "12px",
                      border: "2px solid #000",
                      marginTop: "5px",
                      maxHeight: "400px",
                      overflowY: "auto",
                      zIndex: 1000,
                    }}
                  >
                    {loading ? (
                      <div className="p-3 text-center">
                        <span style={{ fontFamily: "SudoFont" }}>
                          Searching...
                        </span>
                      </div>
                    ) : (
                      <>
                        {searchResults.users.length > 0 && (
                          <div className="p-2">
                            <h6
                              style={{
                                fontFamily: "SudoFont",
                                fontWeight: "600",
                                margin: "8px 12px",
                                color: "#666",
                              }}
                            >
                              Users
                            </h6>
                            {searchResults.users.map((user) => (
                              <Link
                                key={user._id}
                                to={`/profile/${user._id}`}
                                className="text-decoration-none d-block p-2 rounded"
                                style={{ color: "inherit" }}
                                onClick={handleResultClick}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor = "#f8f9fa")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                <div className="d-flex align-items-center">
                                  <img
                                    src={
                                      user.profile_picture ||
                                      "/assets/images/profilePlaceholder.png"
                                    }
                                    alt={user.username}
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      borderRadius: "50%",
                                      marginRight: "10px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <div>
                                    <div
                                      style={{
                                        fontFamily: "SudoFont",
                                        fontWeight: "500",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {user.username}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: "SudoFont",
                                        fontSize: "12px",
                                        opacity: 0.7,
                                      }}
                                    >
                                      {user.bio || "No bio available"}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}

                        {searchResults.projects.length > 0 && (
                          <div className="p-2">
                            <h6
                              style={{
                                fontFamily: "SudoFont",
                                fontWeight: "600",
                                margin: "8px 12px",
                                color: "#666",
                              }}
                            >
                              Projects
                            </h6>
                            {searchResults.projects.map((project) => (
                              <Link
                                key={project._id}
                                to={`/project/${project._id}`}
                                className="text-decoration-none d-block p-2 rounded"
                                style={{ color: "inherit" }}
                                onClick={handleResultClick}
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor = "#f8f9fa")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                <div>
                                  <div
                                    style={{
                                      fontFamily: "SudoFont",
                                      fontWeight: "500",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {project.name}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: "SudoFont",
                                      fontSize: "12px",
                                      opacity: 0.7,
                                    }}
                                  >
                                    {project.description || "No description"}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}

                        {searchResults.activities.length > 0 && (
                          <div className="p-2">
                            <h6
                              style={{
                                fontFamily: "SudoFont",
                                fontWeight: "600",
                                margin: "8px 12px",
                                color: "#666",
                              }}
                            >
                              Activities
                            </h6>
                            {searchResults.activities.map((activity) => (
                              <div
                                key={activity._id}
                                className="p-2 rounded"
                                onMouseEnter={(e) =>
                                  (e.target.style.backgroundColor = "#f8f9fa")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                <div className="d-flex align-items-center">
                                  <img
                                    src={
                                      activity.user?.profile_picture ||
                                      "/assets/images/profilePlaceholder.png"
                                    }
                                    alt={activity.user?.username}
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      borderRadius: "50%",
                                      marginRight: "8px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <div>
                                    <div
                                      style={{
                                        fontFamily: "SudoFont",
                                        fontWeight: "500",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {activity.user?.username} •{" "}
                                      {activity.type}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: "SudoFont",
                                        fontSize: "11px",
                                        opacity: 0.7,
                                      }}
                                    >
                                      {activity.message}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
            </div>
          )}

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={{ fontFamily: "SudoFont" }}
                to="/home"
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
              <button
                className="nav-link btn btn-link"
                style={{
                  fontFamily: "SudoFont",
                  border: "none",
                  background: "none",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
