import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectAPI } from "../api/api";

export default function ProjectList({ searchQuery, refreshTrigger }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  async function fetchProjects() {
    try {
      setLoading(true);
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      const data = await projectAPI.getAllProjects(currentUser._id);
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery) return true;

    const name = project.name?.toLowerCase() || "";
    const description = project.description?.toLowerCase() || "";
    const type = project.type?.toLowerCase() || "";
    const tags = project.tags ? project.tags.join(" ").toLowerCase() : "";
    const query = searchQuery.toLowerCase();

    return (
      name.includes(query) ||
      description.includes(query) ||
      type.includes(query) ||
      tags.includes(query)
    );
  });

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  function ProjectCard({ project }) {
    return (
      <div
        key={project._id}
        className="row mb-3 p-3 mx-auto"
        style={{
          border: "2px solid #000",
          borderRadius: "60px",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          width: "95%",
          height: "120px",
          maxWidth: "1200px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
        onClick={() => handleProjectClick(project._id)}
      >
        <div className="col-2 d-flex align-items-center justify-content-center p-0">
          <img
            src={project.project_image || "/assets/images/imagePlaceholder.jpg"}
            alt={project.name}
            className="img-fluid"
            style={{
              borderRadius: "60px",
              height: "80px",
              width: "80px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-6 d-flex flex-column justify-content-center">
          <h4
            className="mb-1"
            style={{
              fontFamily: "SudoFont",
              fontWeight: "600",
              fontSize: "18px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.name}
          </h4>
          <p
            style={{
              fontFamily: "SudoFont",
              fontSize: "14px",
              opacity: 0.7,
              marginBottom: "8px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.description}
          </p>
          <div className="d-flex flex-wrap gap-2">
            {(project.tags || []).map((tag, index) => (
              <span
                key={index}
                style={{
                  fontFamily: "SudoFont",
                  fontSize: "12px",
                  backgroundColor: "#f0f0f0",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  border: "1px solid #ddd",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="col-4 d-flex flex-column justify-content-center align-items-end pe-4">
          <span
            style={{
              fontFamily: "SudoFont",
              fontSize: "14px",
              opacity: 0.6,
              marginBottom: "4px",
            }}
          >
            {project.type}
          </span>
          <span
            style={{
              fontFamily: "SudoFont",
              fontSize: "12px",
              opacity: 0.5,
            }}
          >
            Updated: {formatDate(project.last_updated)}
          </span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container text-center p-4">
        <div style={{ fontFamily: "SudoFont" }}>Loading projects...</div>
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="container text-center p-4">
        <div style={{ fontFamily: "SudoFont", opacity: 0.7 }}>
          {searchQuery
            ? "No projects found matching your search."
            : "No projects to display."}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
