import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const navigate = useNavigate();

  const projectsData = [
    {
      id: 1,
      title: "React Portfolio",
      description: "A modern portfolio website built with React and Bootstrap",
      image: "/assets/images/imagePlaceholder.jpg",
      type: "Web Development",
      tags: ["React", "Bootstrap", "JavaScript"],
      lastUpdated: "2023-10-15",
    },
    {
      id: 2,
      title: "E-commerce API",
      description:
        "Backend API for an e-commerce platform with user authentication",
      image: "/assets/images/imagePlaceholder.jpg",
      type: "Backend",
      tags: ["Node.js", "Express", "MongoDB"],
      lastUpdated: "2023-10-10",
    },
    {
      id: 3,
      title: "Mobile Weather App",
      description:
        "Weather application for iOS and Android built with React Native",
      image: "/assets/images/imagePlaceholder.jpg",
      type: "Mobile Development",
      tags: ["React Native", "API", "UI/UX"],
      lastUpdated: "2023-10-05",
    },
    // {
    //   id: 4,
    //   title: "Data Analysis Tool",
    //   description: "Python tool for analyzing and visualizing large datasets",
    //   image: "/assets/images/imagePlaceholder.jpg",
    //   type: "Data Science",
    //   tags: ["Python", "Pandas", "Matplotlib"],
    //   lastUpdated: "2023-09-28",
    // },
    // {
    //   id: 5,
    //   title: "Game Engine",
    //   description: "Custom game engine built from scratch using C++ and OpenGL",
    //   image: "/assets/images/imagePlaceholder.jpg",
    //   type: "Game Development",
    //   tags: ["C++", "OpenGL", "Graphics"],
    //   lastUpdated: "2023-09-20",
    // },
  ];

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  function ProjectCard({ project }) {
    return (
      <div
        key={project.id}
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
        onClick={() => handleProjectClick(project.id)}
      >
        <div className="col-2 d-flex align-items-center justify-content-center p-0">
          <img
            src={project.image}
            alt={project.title}
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
            {project.title}
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
            {project.tags.map((tag, index) => (
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
            Updated: {project.lastUpdated}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
