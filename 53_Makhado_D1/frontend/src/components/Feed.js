import React from "react";

export default function Feed({ scope, searchQuery }) {
  function preview(repo) {
    return (
      <div
        key={repo.id}
        className="row mb-3 p-3"
        style={{
          border: "2px solid #000",
          borderRadius: "60px",
          fontFamily: "SudoFont",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          margin: "0 10px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="col-1 d-flex align-items-center justify-content-center p-0">
          <img
            src={repo.image}
            alt={repo.username}
            className="img-fluid"
            style={{
              borderRadius: "60px",
              height: "60px",
              width: "60px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-between align-items-start">
            <h5
              className="mb-1"
              style={{ fontFamily: "SudoFont", fontWeight: "600" }}
            >
              {repo.username}
            </h5>
            <span
              style={{
                fontSize: "12px",
                opacity: 0.6,
                backgroundColor: "#f0f0f0",
                padding: "4px 12px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                fontFamily: "SudoFont",
              }}
            >
              {repo.type || "Activity"}
            </span>
          </div>
          <p
            style={{
              margin: "8px 0",
              opacity: 0.7,
              fontWeight: "normal",
              fontSize: "14px",
              fontFamily: "SudoFont",
            }}
          >
            {repo.message}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span
              style={{
                fontSize: "12px",
                opacity: 0.5,
                fontFamily: "SudoFont",
              }}
            >
              {repo.date}
            </span>
            <div className="d-flex gap-2">
              {repo.tags?.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "11px",
                    fontFamily: "SudoFont",
                    backgroundColor: "#e9ecef",
                    padding: "2px 8px",
                    borderRadius: "15px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function fetchHome() {
    let globalRepos = [
      {
        id: 0,
        username: "John Doe",
        message:
          "Made a pull request to the repository with new authentication features",
        date: "2 hours ago",
        type: "Pull Request",
        tags: ["React", "Auth"],
        image: "/assets/images/imagePlaceholder.jpg",
      },
      {
        id: 1,
        username: "Jane Smith",
        message:
          "Reviewed code and approved changes for the dashboard redesign",
        date: "5 hours ago",
        type: "Code Review",
        tags: ["UI/UX", "Dashboard"],
        image: "/assets/images/imagePlaceholder.jpg",
      },
      {
        id: 2,
        username: "Alice Johnson",
        message: "Merged feature branch into main after successful testing",
        date: "1 day ago",
        type: "Merge",
        tags: ["Testing", "Deployment"],
        image: "/assets/images/imagePlaceholder.jpg",
      },
      // {
      //   id: 3,
      //   username: "Bob Brown",
      //   message: "Commented on issue #42 regarding performance optimization",
      //   date: "2 days ago",
      //   type: "Comment",
      //   tags: ["Performance", "Bug"],
      //   image: "/assets/images/imagePlaceholder.jpg",
      // },
    ];

    let localRepos = [
      {
        id: 0,
        username: "Sam Lee",
        message: "Created a new local repository for the mobile app project",
        date: "3 hours ago",
        type: "Create",
        tags: ["Mobile", "React Native"],
        image: "/assets/images/imagePlaceholder.jpg",
      },
      {
        id: 1,
        username: "Chris Green",
        message:
          "Added comprehensive README file with installation instructions",
        date: "6 hours ago",
        type: "Documentation",
        tags: ["Docs", "Setup"],
        image: "/assets/images/imagePlaceholder.jpg",
      },
      {
        id: 2,
        username: "Pat Kim",
        message:
          "Pushed initial commit with project structure and base components",
        date: "1 day ago",
        type: "Push",
        tags: ["Initial", "Structure"],
        image: "/assets/images/imagePlaceholder.jpg",
      },
      // {
      //   id: 3,
      //   username: "Alex White",
      //   message: "Updated documentation with API reference and examples",
      //   date: "1 day ago",
      //   type: "Update",
      //   tags: ["API", "Docs"],
      //   image: "/assets/images/imagePlaceholder.jpg",
      // },
      // {
      //   id: 4,
      //   username: "Morgan Black",
      //   message: "Fixed local build errors and updated dependencies",
      //   date: "2 days ago",
      //   type: "Fix",
      //   tags: ["Build", "Dependencies"],
      //   image: "/assets/images/imagePlaceholder.jpg",
      // },
    ];

    let repos = scope === "local" ? localRepos : globalRepos;

    // Filter by search query if provided
    if (searchQuery) {
      repos = repos.filter(
        (repo) =>
          repo.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return (
      <>
        <div className="container">{repos.map((repo) => preview(repo))}</div>
      </>
    );
  }

  return fetchHome();
}
