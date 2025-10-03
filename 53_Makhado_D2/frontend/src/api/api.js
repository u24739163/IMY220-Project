const API_BASE_URL = "http://localhost:3000";

function getAuthToken() {
  return localStorage.getItem("sessionToken");
}

function setAuthToken(token) {
  localStorage.setItem("sessionToken", token);
}

function removeAuthToken() {
  localStorage.removeItem("sessionToken");
}

// Make authenticated API request
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log("Making API request to:", url);
    const response = await fetch(url, config);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error(
        "Server returned very very wrong response. Check if the API server is running properly."
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

// Authentication API
export const authAPI = {
  async signUp(userData) {
    const response = await apiRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.sessionId) {
      setAuthToken(response.sessionId);
    }

    return response;
  },

  async signIn(credentials) {
    const response = await apiRequest("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.sessionId) {
      setAuthToken(response.sessionId);
    }

    return response;
  },

  async signOut() {
    try {
      await apiRequest("/api/auth/logout", { method: "POST" });
    } finally {
      removeAuthToken();
    }
  },

  isAuthenticated() {
    return !!getAuthToken();
  },
};

// User API
export const userAPI = {
  async getCurrentUser() {
    return await apiRequest("/api/users/me");
  },

  async getUserById(id) {
    return await apiRequest(`/api/users/${id}`);
  },

  async updateProfile(userData) {
    return await apiRequest("/api/users/me", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },

  async searchUsers(query) {
    return await apiRequest(`/api/users/search/${encodeURIComponent(query)}`);
  },
};

// Project API
export const projectAPI = {
  async getAllProjects(userId = null) {
    const query = userId ? `?user=${userId}` : "";
    return await apiRequest(`/api/projects${query}`);
  },

  async getProjectById(id) {
    return await apiRequest(`/api/projects/${id}`);
  },

  async createProject(projectData) {
    return await apiRequest("/api/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
  },

  async checkoutProject(projectId) {
    return await apiRequest(`/api/projects/${projectId}/checkout`, {
      method: "POST",
    });
  },

  async checkinProject(projectId, message, version = null, fileUpdates = []) {
    return await apiRequest(`/api/projects/${projectId}/checkin`, {
      method: "POST",
      body: JSON.stringify({ message, version, fileUpdates }),
    });
  },

  async deleteProject(projectId) {
    return await apiRequest(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
  },

  async searchProjects(query) {
    return await apiRequest(
      `/api/projects/search/${encodeURIComponent(query)}`
    );
  },

  async updateProject(projectId, updateData) {
    return await apiRequest(`/api/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  },

  async addCollaborator(projectId, email, role = "collaborator") {
    return await apiRequest(`/api/projects/${projectId}/collaborators`, {
      method: "POST",
      body: JSON.stringify({ email, role }),
    });
  },

  async removeCollaborator(projectId, collaboratorId) {
    return await apiRequest(
      `/api/projects/${projectId}/collaborators/${collaboratorId}`,
      {
        method: "DELETE",
      }
    );
  },

  async updateCollaboratorRole(projectId, collaboratorId, role) {
    return await apiRequest(
      `/api/projects/${projectId}/collaborators/${collaboratorId}`,
      {
        method: "PUT",
        body: JSON.stringify({ role }),
      }
    );
  },

  async getCheckinHistory(projectId) {
    return await apiRequest(`/api/projects/${projectId}/checkins`);
  },
};

// Friend API
export const friendAPI = {
  async sendFriendRequest(friendId) {
    return await apiRequest("/api/friends/request", {
      method: "POST",
      body: JSON.stringify({ friendId }),
    });
  },

  async acceptFriendRequest(friendId) {
    return await apiRequest("/api/friends/accept", {
      method: "POST",
      body: JSON.stringify({ friendId }),
    });
  },

  async getFriends() {
    return await apiRequest("/api/friends");
  },

  async unfriend(friendId) {
    return await apiRequest(`/api/friends/${friendId}`, {
      method: "DELETE",
    });
  },

  async getFriendshipStatus(userId) {
    return await apiRequest(`/api/friends/status/${userId}`);
  },

  async getPendingRequests() {
    return await apiRequest("/api/friends/requests");
  },

  async declineRequest(requesterId) {
    return await apiRequest(`/api/friends/requests/${requesterId}`, {
      method: "DELETE",
    });
  },
};

// Activity API
export const activityAPI = {
  async getGlobalFeed(limit = 20) {
    return await apiRequest(`/api/activity/global?limit=${limit}`);
  },

  async getFriendsFeed(limit = 20) {
    return await apiRequest(`/api/activity/friends?limit=${limit}`);
  },
};

// Search API
export const searchAPI = {
  async searchUsers(query) {
    return await apiRequest(`/api/search/users?q=${encodeURIComponent(query)}`);
  },

  async searchProjects(query) {
    return await apiRequest(
      `/api/search/projects?q=${encodeURIComponent(query)}`
    );
  },

  async searchActivities(query) {
    return await apiRequest(
      `/api/search/activities?q=${encodeURIComponent(query)}`
    );
  },
};

// File API
export const fileAPI = {
  async getProjectFiles(projectId) {
    return await apiRequest(`/api/projects/${projectId}/files`);
  },

  async getFile(fileId) {
    return await apiRequest(`/api/files/${fileId}`);
  },

  async createFile(projectId, fileData) {
    return await apiRequest(`/api/projects/${projectId}/files`, {
      method: "POST",
      body: JSON.stringify(fileData),
    });
  },

  async updateFile(fileId, content) {
    return await apiRequest(`/api/files/${fileId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    });
  },

  async deleteFile(fileId) {
    return await apiRequest(`/api/files/${fileId}`, {
      method: "DELETE",
    });
  },

  async uploadFile(projectId, file) {
    const formData = new FormData();
    formData.append("file", file);

    const token = getAuthToken();
    const url = `${API_BASE_URL}/api/projects/${projectId}/files/upload`;

    const config = {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    };

    try {
      console.log("Uploading file to:", url);
      const response = await fetch(url, config);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response during file upload");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "File upload failed");
      }

      return data;
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    }
  },

  async downloadProjectZip(projectId) {
    const url = `${API_BASE_URL}/api/projects/${projectId}/download`;
    const token = getAuthToken();

    const config = {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    try {
      console.log("Downloading project ZIP from:", url);
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error("Failed to download project ZIP");
      }

      return response;
    } catch (error) {
      console.error("ZIP download error:", error);
      throw error;
    }
  },
};
