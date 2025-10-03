import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BigBlock from "../components/BigBlock";
import File from "../components/File";
import Button from "../components/Button";
import { projectAPI, fileAPI } from "../api/api";

export default function Project() {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [projectFiles, setProjectFiles] = useState([]);
  const [checkinHistory, setCheckinHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkinMessage, setCheckinMessage] = useState("");

  // File management states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  // File upload states
  const [createMode, setCreateMode] = useState("text"); 
  const [selectedUploadFile, setSelectedUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Check-in enhancement states
  const [showCheckinModal, setShowCheckinModal] = useState(false);

  // Tab management
  const [activeTab, setActiveTab] = useState("files");

  // Project editing states
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [editProjectData, setEditProjectData] = useState({});
  const [updatingProject, setUpdatingProject] = useState(false);

  // Project administration states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState(false);

  // Collaborator management states
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [newCollaboratorRole, setNewCollaboratorRole] =
    useState("collaborator");
  const [addingCollaborator, setAddingCollaborator] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    if (id) {
      fetchProjectData();
    }
  }, [id]);

  async function fetchProjectData() {
    try {
      setLoading(true);

      // Fetch project data
      console.log("Fetching project data for ID:", id);
      const project = await projectAPI.getProjectById(id);
      setProjectData(project);
      console.log("Project data loaded successfully");

      // Fetch project files
      console.log("Fetching project files...");
      const files = await fileAPI.getProjectFiles(id);
      setProjectFiles(files);
      console.log("Project files loaded successfully");

      // Fetch check-in history
      try {
        console.log("Fetching check-in history...");
        const checkins = await projectAPI.getCheckinHistory(id);
        setCheckinHistory(checkins);
        console.log("Check-in history loaded successfully");
      } catch (historyError) {
        console.error("Error fetching check-in history:", historyError);
        setCheckinHistory([]);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout() {
    try {
      setCheckingOut(true);
      await projectAPI.checkoutProject(id);

      // Download project as ZIP when checking out
      await downloadProjectFiles();

      await fetchProjectData();
      alert(
        "Project checked out successfully! Project files have been downloaded as a ZIP archive."
      );
    } catch (error) {
      console.error("Error checking out project:", error);
      alert("Failed to checkout project");
    } finally {
      setCheckingOut(false);
    }
  }

  async function downloadProjectFiles() {
    try {
      setIsLoading(true);
      const response = await fileAPI.downloadProjectZip(id);

      // Create blob from response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      // Extract filename from Content-Disposition header if available
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `${projectData?.name || "project"}-v${
        projectData?.version || "1.0.0"
      }.zip`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      console.log("Project ZIP downloaded successfully");
    } catch (error) {
      console.error("Error downloading project ZIP:", error);
      alert("Failed to download project files. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCheckin() {
    if (!checkinMessage.trim()) {
      alert("Please enter a check-in message");
      return;
    }

    try {
      setCheckingIn(true);

      // Check in project with message
      await projectAPI.checkinProject(
        id,
        checkinMessage,
        projectData.version || "1.0.0",
        []
      );

      // Reset states
      setCheckinMessage("");
      setShowCheckinModal(false);

      await fetchProjectData(); 
      alert("Project checked in successfully!");
    } catch (error) {
      console.error("Error checking in project:", error);
      alert("Failed to check in project");
    } finally {
      setCheckingIn(false);
    }
  }

  function formatDate(dateString) {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Unknown";
    return date.toLocaleDateString();
  }

  function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return "0 bytes";
    const k = 1024;
    const sizes = ["bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  // File management functions
  async function handleCreateFile() {
    if (createMode === "text") {
      return handleCreateTextFile();
    } else {
      return handleUploadFile();
    }
  }

  async function handleCreateTextFile() {
    if (!newFileName.trim()) {
      alert("Please enter a file name");
      return;
    }

    try {
      setCreating(true);
      await fileAPI.createFile(id, {
        filename: newFileName,
        content: fileContent,
        last_modified_by: currentUser._id,
        size: new Blob([fileContent]).size,
      });

      resetCreateModal();
      await fetchProjectData();
      alert("File created successfully!");
    } catch (error) {
      console.error("Error creating file:", error);
      alert("Failed to create file");
    } finally {
      setCreating(false);
    }
  }

  async function handleUploadFile() {
    if (!selectedUploadFile) {
      alert("Please select a file to upload");
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; 
    if (selectedUploadFile.size > maxSize) {
      alert("File size exceeds 10MB limit. Please choose a smaller file.");
      return;
    }

    try {
      setUploading(true);
      await fileAPI.uploadFile(id, selectedUploadFile);

      resetCreateModal();
      await fetchProjectData();
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(error.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  }

  function handleFileSelect(event) {
    const file = event.target.files[0];
    setSelectedUploadFile(file);
  }

  function resetCreateModal() {
    setNewFileName("");
    setFileContent("");
    setSelectedUploadFile(null);
    setCreateMode("text");
    setShowCreateModal(false);
  }

  async function handleEditFile(file) {
    try {
      setSelectedFile(file);
      // Fetch the full file content from the server
      const fullFile = await fileAPI.getFile(file._id);
      setFileContent(fullFile.content || "");
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching file content:", error);
      alert("Failed to load file content");
    }
  }

  async function handleUpdateFile() {
    if (!selectedFile) return;

    try {
      setUpdating(true);
      await fileAPI.updateFile(selectedFile._id, fileContent, currentUser._id);

      setSelectedFile(null);
      setFileContent("");
      setShowEditModal(false);
      await fetchProjectData(); 
      alert("File updated successfully!");
    } catch (error) {
      console.error("Error updating file:", error);
      alert("Failed to update file");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDeleteFile(file) {
    try {
      console.log("Deleting file:", file);
      console.log("File ID:", file._id || file.id);

      if (!file._id && !file.id) {
        throw new Error("File ID is undefined - cannot delete file");
      }

      await fileAPI.deleteFile(file._id || file.id);
      await fetchProjectData(); 
      alert("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file: " + error.message);
    }
  }

  function closeModals() {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowCheckinModal(false);
    setSelectedFile(null);
    setNewFileName("");
    setFileContent("");
    setCheckinMessage("");
    setSelectedUploadFile(null);
    setCreateMode("text");
  }

  // Project editing functions
  function handleEditProject() {
    setEditProjectData({
      name: projectData.name || "",
      description: projectData.description || "",
      type: projectData.type || "",
      tags: projectData.tags ? projectData.tags.join(", ") : "",
    });
    setShowEditProjectModal(true);
  }

  async function handleDeleteProject() {
    try {
      setDeletingProject(true);
      await projectAPI.deleteProject(id);
      alert("Project deleted successfully!");
      window.location.href = "/projects";
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project: " + (error.message || "Unknown error"));
    } finally {
      setDeletingProject(false);
      setShowDeleteModal(false);
    }
  }

  async function handleUpdateProject() {
    if (!editProjectData.name?.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      setUpdatingProject(true);
      const updateData = {
        name: editProjectData.name.trim(),
        description: editProjectData.description.trim(),
        type: editProjectData.type.trim(),
        tags: editProjectData.tags
          ? editProjectData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : [],
      };

      await projectAPI.updateProject(id, updateData);
      await fetchProjectData();
      setShowEditProjectModal(false);
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project: " + (error.message || "Unknown error"));
    } finally {
      setUpdatingProject(false);
    }
  }

  // Collaborator management functions
  function handleManageCollaborators() {
    setShowCollaboratorModal(true);
  }

  async function handleAddCollaborator() {
    if (!newCollaboratorEmail.trim()) {
      alert("Please enter an email address");
      return;
    }

    try {
      setAddingCollaborator(true);
      await projectAPI.addCollaborator(
        id,
        newCollaboratorEmail.trim(),
        newCollaboratorRole
      );
      await fetchProjectData(); 
      setNewCollaboratorEmail("");
      setNewCollaboratorRole("collaborator");
      alert("Collaborator added successfully!");
    } catch (error) {
      console.error("Error adding collaborator:", error);
      alert(
        "Failed to add collaborator: " + (error.message || "Unknown error")
      );
    } finally {
      setAddingCollaborator(false);
    }
  }

  async function handleRemoveCollaborator(collaboratorId) {
    if (!confirm("Are you sure you want to remove this collaborator?")) {
      return;
    }

    try {
      await projectAPI.removeCollaborator(id, collaboratorId);
      await fetchProjectData(); 
      alert("Collaborator removed successfully!");
    } catch (error) {
      console.error("Error removing collaborator:", error);
      alert(
        "Failed to remove collaborator: " + (error.message || "Unknown error")
      );
    }
  }

  async function handleUpdateCollaboratorRole(collaboratorId, newRole) {
    try {
      await projectAPI.updateCollaboratorRole(id, collaboratorId, newRole);
      await fetchProjectData();
      alert("Collaborator role updated successfully!");
    } catch (error) {
      console.error("Error updating collaborator role:", error);
      alert(
        "Failed to update collaborator role: " +
          (error.message || "Unknown error")
      );
    }
  }

  const isOwner = projectData?.collaborators?.some(
    (collab) => collab.user._id === currentUser._id && collab.role === "owner"
  );

  const isCollaborator = projectData?.collaborators?.some(
    (collab) =>
      collab.user._id === currentUser._id &&
      (collab.role === "owner" || collab.role === "collaborator")
  );

  if (loading) {
    return (
      <div className="project-page">
        <div className="project-container">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Loading project...
          </div>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="project-page">
        <div className="project-container">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Project not found
          </div>
        </div>
      </div>
    );
  }

  function content() {
    return (
      <>
        <div className="container align-self-start">
          <div className="row" style={{ minHeight: "600px" }}>
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
                  {projectData.category || "General"}
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
                  {(projectData.tags || []).map((tag, index) => (
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
                  v{projectData.version || "1.0.0"}
                </p>
                <small
                  style={{
                    fontFamily: "SudoFont",
                    fontSize: "12px",
                    opacity: 0.6,
                  }}
                >
                  Created: {formatDate(projectData.createdAt)}
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
                  {(projectData.collaborators || []).map((collab, index) => (
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
                      {collab.user?.username ||
                        collab.username ||
                        (typeof collab === "string" ? collab : "Unknown User")}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ps-2 mt-4">
                {/* Only show management buttons to collaborators */}
                {isCollaborator && (
                  <>
                    <div className="mb-3">
                      <Button
                        label="Create File"
                        onClick={() => setShowCreateModal(true)}
                      />
                    </div>

                    {projectData.isCheckedOut &&
                      projectData.checkedOutBy !== currentUser._id && (
                        <div className="mb-3">
                          <div
                            style={{
                              padding: "10px",
                              backgroundColor: "#ffebee",
                              border: "1px solid #ffcdd2",
                              borderRadius: "8px",
                              fontFamily: "SudoFont",
                              fontSize: "12px",
                              color: "#c62828",
                            }}
                          >
                            Project is currently checked out by another user.
                            You cannot make changes until it's checked back in.
                          </div>
                        </div>
                      )}
                    {!projectData.isCheckedOut && (
                      <div className="mb-3">
                        <Button
                          label={
                            checkingOut
                              ? "Checking Out..."
                              : "Check Out Project"
                          }
                          onClick={handleCheckout}
                          disabled={checkingOut}
                        />
                      </div>
                    )}
                    {projectData.isCheckedOut &&
                      projectData.checkedOutBy === currentUser._id && (
                        <div className="mb-3">
                          <Button
                            label="Check In Project"
                            onClick={() => setShowCheckinModal(true)}
                          />
                        </div>
                      )}
                    {isOwner && (
                      <div className="mb-3">
                        <Button
                          label="Edit Project"
                          onClick={handleEditProject}
                        />
                      </div>
                    )}
                    {isOwner && (
                      <div className="mb-3">
                        <Button
                          label="Manage Collaborators"
                          onClick={handleManageCollaborators}
                        />
                      </div>
                    )}
                    {isOwner && (
                      <div className="mb-3">
                        <Button
                          label="Delete Project"
                          onClick={() => setShowDeleteModal(true)}
                          style={{
                            backgroundColor: "#dc3545",
                            borderColor: "#dc3545",
                            color: "white",
                          }}
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Non-collaborator message */}
                {!isCollaborator && (
                  <div
                    style={{
                      padding: "15px",
                      backgroundColor: "#f8f9fa",
                      border: "2px solid #e9ecef",
                      borderRadius: "12px",
                      fontFamily: "SudoFont",
                      fontSize: "14px",
                      color: "#6c757d",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
                      View Only Access
                    </p>
                    <p style={{ margin: 0, fontSize: "12px" }}>
                      You can view and download this project, but you need to be
                      a collaborator to make changes.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col mt-2">
              <div
                className="row align-items-center pb-3"
                style={{ borderBottom: "2px solid #000" }}
              >
                <div className="col-2">
                  <img
                    src={
                      projectData.image || "/assets/images/imagePlaceholder.jpg"
                    }
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
                    {projectData.name || projectData.title}
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
                    onClick={() => downloadProjectFiles()}
                  />
                  <span
                    style={{
                      fontFamily: "SudoFont",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {isLoading ? "Downloading..." : "Download Project"}
                  </span>
                </div>
              </div>
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
              <div className="row mt-4">
                <div className="col">
                  {/* Tab Navigation */}
                  <div
                    className="d-flex mb-3"
                    style={{ borderBottom: "2px solid #000" }}
                  >
                    <button
                      onClick={() => setActiveTab("files")}
                      style={{
                        fontFamily: "SudoFont",
                        fontWeight: activeTab === "files" ? "600" : "400",
                        color: activeTab === "files" ? "#000" : "#666",
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "12px 20px",
                        borderBottom:
                          activeTab === "files"
                            ? "3px solid #000"
                            : "3px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      Files ({projectFiles.length})
                    </button>
                    <button
                      onClick={() => setActiveTab("messages")}
                      style={{
                        fontFamily: "SudoFont",
                        fontWeight: activeTab === "messages" ? "600" : "400",
                        color: activeTab === "messages" ? "#000" : "#666",
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "12px 20px",
                        borderBottom:
                          activeTab === "messages"
                            ? "3px solid #000"
                            : "3px solid transparent",
                        cursor: "pointer",
                      }}
                    >
                      Messages ({checkinHistory.length})
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === "files" && (
                    <>
                      {projectFiles.length > 0 ? (
                        projectFiles.map((file, index) => {
                          const canEdit =
                            isCollaborator &&
                            projectData.isCheckedOut &&
                            projectData.checkedOutBy === currentUser._id;

                          console.log(
                            "Project debug for file:",
                            file.filename,
                            {
                              isCollaborator,
                              projectIsCheckedOut: projectData.isCheckedOut,
                              checkedOutBy: projectData.checkedOutBy,
                              currentUserId: currentUser._id,
                              canEdit,
                              fileStatus: projectData.isCheckedOut
                                ? "checked-out"
                                : "checked-in",
                            }
                          );

                          return (
                            <File
                              key={file._id || index}
                              fileData={{
                                name: file.filename,
                                type: file.type || "text",
                                size: formatFileSize(file.size),
                                upload_date: file.last_modified
                                  ? formatDate(file.last_modified)
                                  : "Unknown",
                                version: file.version || "1.0",
                                status: projectData.isCheckedOut
                                  ? "checked-out"
                                  : "checked-in",
                                checkedOutBy: projectData.checkedOutBy
                                  ? projectData.checkedOutBy.username ||
                                    "Unknown User"
                                  : null,
                              }}
                              onEdit={() => handleEditFile(file)}
                              canEdit={
                                isCollaborator &&
                                projectData.isCheckedOut &&
                                projectData.checkedOutBy === currentUser._id
                              }
                              onDelete={() => handleDeleteFile(file)}
                              onDownload={async () => {
                                try {
                                  const fullFile = await fileAPI.getFile(
                                    file._id
                                  );
                                  let blob;

                                  // Check if this is an uploaded file stored as base64
                                  if (
                                    fullFile.is_uploaded &&
                                    fullFile.content
                                  ) {
                                    // Convert base64 to blob
                                    const binaryString = atob(fullFile.content);
                                    const bytes = new Uint8Array(
                                      binaryString.length
                                    );
                                    for (
                                      let i = 0;
                                      i < binaryString.length;
                                      i++
                                    ) {
                                      bytes[i] = binaryString.charCodeAt(i);
                                    }
                                    blob = new Blob([bytes], {
                                      type:
                                        fullFile.type ||
                                        "application/octet-stream",
                                    });
                                  } else {
                                    // Regular text file
                                    blob = new Blob([fullFile.content || ""], {
                                      type: "text/plain",
                                    });
                                  }

                                  const url = window.URL.createObjectURL(blob);
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.download = fullFile.filename;
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);
                                  window.URL.revokeObjectURL(url);
                                } catch (error) {
                                  console.error(
                                    "Error downloading file:",
                                    error
                                  );
                                  alert("Failed to download file");
                                }
                              }}
                            />
                          );
                        })
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "2rem",
                            fontFamily: "SudoFont",
                            color: "#666",
                          }}
                        >
                          No files in this project yet
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === "messages" && (
                    <div>
                      {checkinHistory.length > 0 ? (
                        <div>
                          {checkinHistory.map((checkin, index) => (
                            <div
                              key={checkin._id || index}
                              style={{
                                backgroundColor:
                                  checkin.type === "checkout"
                                    ? "#fff3e0"
                                    : "#f8f9fa",
                                border: `2px solid ${
                                  checkin.type === "checkout"
                                    ? "#f57c00"
                                    : "#000"
                                }`,
                                borderRadius: "12px",
                                padding: "16px",
                                marginBottom: "12px",
                                fontFamily: "SudoFont",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "start",
                                  marginBottom: "8px",
                                }}
                              >
                                <div>
                                  <strong style={{ color: "#000" }}>
                                    {checkin.user?.username || "Unknown User"}
                                  </strong>
                                  <span
                                    style={{
                                      color:
                                        checkin.type === "checkout"
                                          ? "#f57c00"
                                          : "#666",
                                      marginLeft: "8px",
                                    }}
                                  >
                                    {checkin.type === "checkout"
                                      ? "checked out"
                                      : "checked in"}
                                  </span>
                                </div>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    backgroundColor: "#fff",
                                    padding: "4px 8px",
                                    borderRadius: "6px",
                                    border: "1px solid #ddd",
                                  }}
                                >
                                  {formatDate(checkin.timestamp)}
                                </span>
                              </div>
                              <div
                                style={{
                                  backgroundColor: "#fff",
                                  padding: "12px",
                                  borderRadius: "8px",
                                  border: "1px solid #ddd",
                                  fontSize: "14px",
                                  lineHeight: "1.4",
                                }}
                              >
                                {checkin.message}
                              </div>
                              {checkin.version && (
                                <div
                                  style={{
                                    marginTop: "8px",
                                    fontSize: "12px",
                                    color: "#666",
                                  }}
                                >
                                  Version: {checkin.version}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "2rem",
                            fontFamily: "SudoFont",
                            color: "#666",
                          }}
                        >
                          No check-in messages yet
                        </div>
                      )}
                    </div>
                  )}
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

      {showCreateModal && isCollaborator && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              border: "2px solid #000",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80%",
              overflow: "auto",
            }}
          >
            <h3 style={{ fontFamily: "SudoFont", marginBottom: "20px" }}>
              Add New File
            </h3>

            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => setCreateMode("text")}
                style={{
                  padding: "8px 16px",
                  fontFamily: "SudoFont",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "2px solid #000",
                  borderRadius: "8px",
                  backgroundColor: createMode === "text" ? "#000" : "white",
                  color: createMode === "text" ? "white" : "#000",
                  cursor: "pointer",
                }}
              >
                Create Text File
              </button>
              <button
                onClick={() => setCreateMode("upload")}
                style={{
                  padding: "8px 16px",
                  fontFamily: "SudoFont",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "2px solid #000",
                  borderRadius: "8px",
                  backgroundColor: createMode === "upload" ? "#000" : "white",
                  color: createMode === "upload" ? "white" : "#000",
                  cursor: "pointer",
                }}
              >
                Upload File
              </button>
            </div>

            {createMode === "text" && (
              <>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      fontFamily: "SudoFont",
                      fontWeight: "600",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    File Name:
                  </label>
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="e.g., index.html, script.js, styles.css"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "14px",
                      fontFamily: "SudoFont",
                      border: "2px solid #000",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      fontFamily: "SudoFont",
                      fontWeight: "600",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    File Content:
                  </label>
                  <textarea
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    placeholder="Enter your file content here..."
                    rows="10"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "14px",
                      fontFamily: "monospace",
                      border: "2px solid #000",
                      borderRadius: "8px",
                      resize: "vertical",
                    }}
                  />
                </div>
              </>
            )}

            {createMode === "upload" && (
              <>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      fontFamily: "SudoFont",
                      fontWeight: "600",
                      marginBottom: "5px",
                      display: "block",
                    }}
                  >
                    Select File (Max 10MB):
                  </label>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "14px",
                      fontFamily: "SudoFont",
                      border: "2px solid #000",
                      borderRadius: "8px",
                      backgroundColor: "white",
                    }}
                  />
                </div>

                {selectedUploadFile && (
                  <div
                    style={{
                      marginBottom: "20px",
                      padding: "15px",
                      backgroundColor: "#f8f8f8",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "SudoFont",
                        fontWeight: "600",
                        marginBottom: "8px",
                        fontSize: "14px",
                      }}
                    >
                      File Selected:
                    </p>
                    <p
                      style={{
                        fontFamily: "SudoFont",
                        fontSize: "13px",
                        margin: "4px 0",
                      }}
                    >
                      <strong>Name:</strong> {selectedUploadFile.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "SudoFont",
                        fontSize: "13px",
                        margin: "4px 0",
                      }}
                    >
                      <strong>Size:</strong>{" "}
                      {formatFileSize(selectedUploadFile.size)}
                    </p>
                    <p
                      style={{
                        fontFamily: "SudoFont",
                        fontSize: "13px",
                        margin: "4px 0",
                      }}
                    >
                      <strong>Type:</strong>{" "}
                      {selectedUploadFile.type || "Unknown"}
                    </p>
                    {selectedUploadFile.size > 10 * 1024 * 1024 && (
                      <p
                        style={{
                          color: "red",
                          fontFamily: "SudoFont",
                          fontSize: "12px",
                          marginTop: "8px",
                        }}
                      >
                        ⚠️ File exceeds 10MB limit
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Button label="Cancel" onClick={closeModals} />
              <Button
                label={
                  creating || uploading
                    ? createMode === "upload"
                      ? "Uploading..."
                      : "Creating..."
                    : createMode === "upload"
                    ? "Upload File"
                    : "Create File"
                }
                onClick={handleCreateFile}
                disabled={creating || uploading}
              />
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedFile && isCollaborator && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              border: "2px solid #000",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80%",
              overflow: "auto",
            }}
          >
            <h3 style={{ fontFamily: "SudoFont", marginBottom: "20px" }}>
              Edit File: {selectedFile.filename || selectedFile.name}
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontFamily: "SudoFont",
                  fontWeight: "600",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                File Content:
              </label>
              <textarea
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                rows="15"
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  border: "2px solid #000",
                  borderRadius: "8px",
                  resize: "vertical",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Button label="Cancel" onClick={closeModals} />
              <Button
                label={updating ? "Updating..." : "Update File"}
                onClick={handleUpdateFile}
                disabled={updating}
              />
            </div>
          </div>
        </div>
      )}

      {showCheckinModal && isCollaborator && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "500px" }}>
            <h3>Check In Project: {projectData?.name}</h3>

            <div className="form-group">
              <label>Check-in Message: *</label>
              <textarea
                value={checkinMessage}
                onChange={(e) => setCheckinMessage(e.target.value)}
                placeholder="Describe the changes made in this check-in..."
                rows="4"
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                label="Cancel"
                onClick={() => setShowCheckinModal(false)}
              />
              <Button
                label={checkingIn ? "Checking In..." : "Check In Project"}
                onClick={handleCheckin}
                disabled={checkingIn || !checkinMessage.trim()}
              />
            </div>
          </div>
        </div>
      )}

      {showEditProjectModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "600px" }}>
            <h3>Edit Project</h3>

            <div className="form-group">
              <label>Project Name:</label>
              <input
                type="text"
                value={editProjectData.name || ""}
                onChange={(e) =>
                  setEditProjectData({
                    ...editProjectData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter project name"
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={editProjectData.description || ""}
                onChange={(e) =>
                  setEditProjectData({
                    ...editProjectData,
                    description: e.target.value,
                  })
                }
                placeholder="Enter project description"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Type:</label>
              <input
                type="text"
                value={editProjectData.type || ""}
                onChange={(e) =>
                  setEditProjectData({
                    ...editProjectData,
                    type: e.target.value,
                  })
                }
                placeholder="e.g. Web Development, Mobile App, etc."
              />
            </div>

            <div className="form-group">
              <label>Tags (comma separated):</label>
              <input
                type="text"
                value={editProjectData.tags || ""}
                onChange={(e) =>
                  setEditProjectData({
                    ...editProjectData,
                    tags: e.target.value,
                  })
                }
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                label="Cancel"
                onClick={() => setShowEditProjectModal(false)}
              />
              <Button
                label={updatingProject ? "Updating..." : "Update Project"}
                onClick={handleUpdateProject}
                disabled={updatingProject}
              />
            </div>
          </div>
        </div>
      )}

      {showCollaboratorModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "700px" }}>
            <h3>Manage Collaborators</h3>

            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <h4>Add New Collaborator</h4>
              <div style={{ display: "flex", gap: "10px", alignItems: "end" }}>
                <div style={{ flex: 1 }}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={newCollaboratorEmail}
                    onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                    placeholder="Enter collaborator's email"
                  />
                </div>
                <div>
                  <label>Role:</label>
                  <select
                    value={newCollaboratorRole}
                    onChange={(e) => setNewCollaboratorRole(e.target.value)}
                  >
                    <option value="collaborator">Collaborator</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <Button
                  label={addingCollaborator ? "Adding..." : "Add"}
                  onClick={handleAddCollaborator}
                  disabled={addingCollaborator || !newCollaboratorEmail.trim()}
                />
              </div>
            </div>

            <div>
              <h4>Current Collaborators</h4>
              {projectData?.collaborators?.length > 0 ? (
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {projectData.collaborators.map((collab, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                        border: "1px solid #eee",
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      <div>
                        <strong>{collab.user.username}</strong>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          Role: {collab.role}
                        </div>
                      </div>

                      {collab.role !== "owner" && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <select
                            value={collab.role}
                            onChange={(e) =>
                              handleUpdateCollaboratorRole(
                                collab.user._id,
                                e.target.value
                              )
                            }
                            style={{ padding: "5px" }}
                          >
                            <option value="collaborator">Collaborator</option>
                            <option value="viewer">Viewer</option>
                          </select>
                          <button
                            onClick={() =>
                              handleRemoveCollaborator(collab.user._id)
                            }
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      {collab.role === "owner" && (
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#28a745",
                            color: "white",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                        >
                          Owner
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No collaborators found.</p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                label="Close"
                onClick={() => setShowCollaboratorModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "400px" }}>
            <h3>Delete Project</h3>
            <p style={{ marginBottom: "20px" }}>
              Are you sure you want to delete "{projectData?.name}"? This action
              cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                label="Cancel"
                onClick={() => setShowDeleteModal(false)}
                disabled={deletingProject}
              />
              <Button
                label={deletingProject ? "Deleting..." : "Delete Project"}
                onClick={handleDeleteProject}
                disabled={deletingProject}
                style={{
                  backgroundColor: "#dc3545",
                  borderColor: "#dc3545",
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
