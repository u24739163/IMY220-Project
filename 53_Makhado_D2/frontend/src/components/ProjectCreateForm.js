import React, { useState } from "react";
import { projectAPI } from "../api/api";
import Button from "./Button";
import InputField from "./InputField";

export default function ProjectCreateForm({ onProjectCreated, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Web Development",
    tags: "",
    version: "1.0.0",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const projectTypes = [
    "Web Development",
    "Mobile Development",
    "Backend",
    "Data Science",
    "Game Development",
    "Desktop Application",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const projectData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      if (selectedImage) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          projectData.project_image = reader.result;
          const project = await projectAPI.createProject(projectData);
          onProjectCreated(project);
        };
        reader.readAsDataURL(selectedImage);
        return;
      }

      const project = await projectAPI.createProject(projectData);
      onProjectCreated(project);
    } catch (error) {
      console.error("Error creating project:", error);
      alert(error.message || "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div
            className="p-4"
            style={{
              border: "2px solid #000",
              borderRadius: "60px",
              backgroundColor: "white",
            }}
          >
            <h3
              style={{
                fontFamily: "SudoFont",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              Create New Project
            </h3>

            <form onSubmit={handleSubmit}>
              <InputField
                id="name"
                name="name"
                label="Project Name *"
                placeholder="Enter project name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontFamily: "SudoFont" }}
                >
                  Project Image
                </label>
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <img
                      src={
                        imagePreview || "/assets/images/imagePlaceholder.jpg"
                      }
                      alt="Project preview"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "2px solid #000",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{
                        fontFamily: "SudoFont",
                        border: "2px solid #000",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    />
                    <small
                      style={{
                        display: "block",
                        marginTop: "4px",
                        opacity: 0.7,
                      }}
                    >
                      Max size: 5MB
                    </small>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="form-label"
                  style={{ fontFamily: "SudoFont" }}
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{
                    fontFamily: "SudoFont",
                    borderRadius: "20px",
                    border: "3px solid #000",
                    width: "80%",
                    margin: "0 auto",
                    display: "block",
                  }}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="type"
                  className="form-label"
                  style={{ fontFamily: "SudoFont" }}
                >
                  Project Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="form-control"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={{
                    fontFamily: "SudoFont",
                    borderRadius: "60px",
                    border: "3px solid #000",
                    width: "80%",
                    margin: "0 auto",
                    display: "block",
                  }}
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                id="tags"
                name="tags"
                label="Tags (comma separated)"
                placeholder="e.g. React, JavaScript, CSS"
                value={formData.tags}
                onChange={handleInputChange}
              />

              <InputField
                id="version"
                name="version"
                label="Version"
                placeholder="1.0.0"
                value={formData.version}
                onChange={handleInputChange}
              />

              <div className="row justify-content-center mt-4">
                <div className="col-auto">
                  <Button
                    label={isLoading ? "Creating..." : "Create Project"}
                    type="submit"
                    disabled={isLoading}
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                    style={{
                      fontFamily: "SudoFont",
                      borderRadius: "60px",
                      border: "2px solid #666",
                      padding: "10px 20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
