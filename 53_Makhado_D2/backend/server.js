const express = require("express");
const path = require("path");
const cors = require("cors");
const JSZip = require("jszip");
const multer = require("multer");

const {
  initDatabase,
  UserService,
  ProjectService,
  FriendService,
  ActivityService,
  FileService,
} = require("./database.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./frontend/public"));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

// Initialize database
initDatabase().catch((err) => {
  console.error("Database initialization failed:", err);
});

const sessions = new Map();

function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function requireAuth(req, res, next) {
  const sessionId = req.headers.authorization?.replace("Bearer ", "");
  const userId = sessions.get(sessionId);

  if (!userId) {
    return res.status(401).json({ error: "Authentication required" });
  }

  req.userId = userId;
  next();
}

// Authentication Routes
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;

    // Check if user already exists
    const existingUser = await UserService.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    const user = await UserService.create({ username, email, password, bio });
    const sessionId = generateSessionId();
    sessions.set(sessionId, user._id.toString());

    res.json({
      success: true,
      user: user,
      sessionId: sessionId,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserService.validatePassword(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const sessionId = generateSessionId();
    sessions.set(sessionId, user._id.toString());
    res.json({
      success: true,
      user: user,
      sessionId: sessionId,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/auth/logout", requireAuth, (req, res) => {
  const sessionId = req.headers.authorization?.replace("Bearer ", "");
  sessions.delete(sessionId);
  res.json({ success: true });
});

// User Routes
app.get("/api/users/me", requireAuth, async (req, res) => {
  try {
    const user = await UserService.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await UserService.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/users/me", requireAuth, async (req, res) => {
  try {
    const user = await UserService.update(req.userId, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users/search/:query", async (req, res) => {
  try {
    const users = await UserService.search(req.params.query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Project Routes
app.get("/api/projects", async (req, res) => {
  try {
    const userId = req.query.user ? req.query.user : null;
    const projects = await ProjectService.findAll(userId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/test/checkins", (req, res) => {
  res.json({ message: "Test route working", timestamp: new Date() });
});

app.get("/api/projects/:id/checkins", requireAuth, async (req, res) => {
  try {
    const checkins = await ProjectService.getCheckinHistory(req.params.id);
    res.json(checkins);
  } catch (error) {
    console.error("Checkins error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await ProjectService.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/projects", requireAuth, async (req, res) => {
  try {
    const projectData = { ...req.body, created_by: req.userId };
    const project = await ProjectService.create(projectData);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/projects/:id/checkout", requireAuth, async (req, res) => {
  try {
    await ProjectService.checkOut(req.params.id, req.userId);
    res.json({ success: true });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/projects/:id/checkin", requireAuth, async (req, res) => {
  try {
    const { message, version, fileUpdates } = req.body;
    const checkin = await ProjectService.checkIn(
      req.params.id,
      req.userId,
      message,
      fileUpdates,
      version
    );
    res.json(checkin);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update project
app.put("/api/projects/:id", requireAuth, async (req, res) => {
  try {
    const project = await ProjectService.update(
      req.params.id,
      req.userId,
      req.body
    );
    res.json(project);
  } catch (error) {
    if (
      error.message.includes("Only project owner") ||
      error.message.includes("collaborators can edit")
    ) {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete project
app.delete("/api/projects/:id", requireAuth, async (req, res) => {
  try {
    const result = await ProjectService.delete(req.params.id, req.userId);
    res.json(result);
  } catch (error) {
    if (error.message.includes("Only project owner")) {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add collaborator
app.post("/api/projects/:id/collaborators", requireAuth, async (req, res) => {
  try {
    const { email, role } = req.body;
    const collaborator = await ProjectService.addCollaborator(
      req.params.id,
      req.userId,
      email,
      role
    );
    res.json(collaborator);
  } catch (error) {
    if (
      error.message.includes("Only project owner") ||
      error.message.includes("User not found") ||
      error.message.includes("already a collaborator")
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Remove collaborator
app.delete(
  "/api/projects/:id/collaborators/:collaboratorId",
  requireAuth,
  async (req, res) => {
    try {
      await ProjectService.removeCollaborator(
        req.params.id,
        req.userId,
        req.params.collaboratorId
      );
      res.json({ success: true });
    } catch (error) {
      if (
        error.message.includes("Only project owner") ||
        error.message.includes("Cannot remove")
      ) {
        return res.status(403).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update collaborator role
app.put(
  "/api/projects/:id/collaborators/:collaboratorId",
  requireAuth,
  async (req, res) => {
    try {
      const { role } = req.body;
      await ProjectService.updateCollaboratorRole(
        req.params.id,
        req.userId,
        req.params.collaboratorId,
        role
      );
      res.json({ success: true });
    } catch (error) {
      if (
        error.message.includes("Only project owner") ||
        error.message.includes("Cannot change")
      ) {
        return res.status(403).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.delete("/api/projects/:id", requireAuth, async (req, res) => {
  try {
    await ProjectService.delete(req.params.id, req.userId);
    res.json({ success: true });
  } catch (error) {
    if (error.message === "Only project owner can delete project") {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/projects/search/:query", async (req, res) => {
  try {
    const projects = await ProjectService.search(req.params.query);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Friend Routes
app.post("/api/friends/request", requireAuth, async (req, res) => {
  try {
    const { friendId } = req.body;
    await FriendService.sendRequest(req.userId, friendId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/friends/accept", requireAuth, async (req, res) => {
  try {
    const { friendId } = req.body;
    await FriendService.acceptRequest(req.userId, friendId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/friends", requireAuth, async (req, res) => {
  try {
    const friends = await FriendService.getFriends(req.userId);
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/friends/:friendId", requireAuth, async (req, res) => {
  try {
    await FriendService.unfriend(req.userId, req.params.friendId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/friends/status/:userId", requireAuth, async (req, res) => {
  try {
    const status = await FriendService.getFriendshipStatus(
      req.userId,
      req.params.userId
    );
    res.json({ status });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/friends/requests", requireAuth, async (req, res) => {
  try {
    const requests = await FriendService.getPendingRequests(req.userId);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete(
  "/api/friends/requests/:requesterId",
  requireAuth,
  async (req, res) => {
    try {
      await FriendService.declineRequest(req.userId, req.params.requesterId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Activity Feed Routes
app.get("/api/activity/global", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const activities = await ActivityService.getGlobalFeed(limit);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/activity/friends", requireAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const activities = await ActivityService.getFriendsFeed(req.userId, limit);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Unified Search Routes
app.get("/api/search/users", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json([]);
    }

    const users = await UserService.search(query);
    res.json(users);
  } catch (error) {
    console.error("User search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/search/projects", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json([]);
    }

    const projects = await ProjectService.search(query);
    res.json(projects);
  } catch (error) {
    console.error("Project search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/search/activities", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json([]);
    }

    const activities = await ActivityService.searchActivities(query);
    res.json(activities);
  } catch (error) {
    console.error("Activity search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// File Routes
app.get("/api/projects/:id/files", async (req, res) => {
  try {
    const files = await FileService.getByProject(req.params.id);
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/projects/:id/files", requireAuth, async (req, res) => {
  try {
    const fileData = {
      ...req.body,
      project_id: req.params.id,
      last_modified_by: req.userId,
    };
    const file = await FileService.create(fileData);
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// File upload endpoint
app.post(
  "/api/projects/:id/files/upload",
  requireAuth,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Check file size
      if (req.file.size > 10 * 1024 * 1024) {
        return res.status(400).json({ error: "File size exceeds 10MB limit" });
      }

      // Convert file buffer to base64 for storage
      const content = req.file.buffer.toString("base64");

      const fileData = {
        filename: req.file.originalname,
        content: content,
        project_id: req.params.id,
        last_modified_by: req.userId,
        size: req.file.size,
        type: req.file.mimetype || "application/octet-stream",
        is_uploaded: true,
      };

      const file = await FileService.create(fileData);
      res.json(file);
    } catch (error) {
      console.error("File upload error:", error);
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File size exceeds 10MB limit" });
      }
      res.status(500).json({ error: "Failed to upload file" });
    }
  }
);

app.get("/api/files/:id", async (req, res) => {
  try {
    const file = await FileService.getById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/files/:id", requireAuth, async (req, res) => {
  try {
    const { content } = req.body;
    await FileService.update(req.params.id, content, req.userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/files/:id", requireAuth, async (req, res) => {
  try {
    await FileService.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ZIP download endpoint
app.get("/api/projects/:id/download", async (req, res) => {
  try {
    const project = await ProjectService.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const files = await FileService.getByProject(req.params.id);
    const zip = new JSZip();

    // Add each file to the ZIP
    files.forEach((file) => {
      zip.file(file.filename, file.content || "");
    });

    // Add project metadata
    const metadata = {
      project: {
        name: project.name,
        description: project.description,
        type: project.type,
        version: project.version,
        tags: project.tags,
        created_at: project.created_at,
        last_updated: project.last_updated,
      },
      files_count: files.length,
      download_date: new Date(),
    };
    zip.file("project-info.json", JSON.stringify(metadata, null, 2));

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // Set appropriate headers
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${project.name.replace(/[^a-zA-Z0-9]/g, "_")}-v${
        project.version
      }.zip"`
    );
    res.setHeader("Content-Length", zipBuffer.length);

    res.send(zipBuffer);
  } catch (error) {
    console.error("ZIP download error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Legacy routes for backward compatibility
app.post("/signup/validate", async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    const existingUser = await UserService.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    const user = await UserService.create({ username, email, password, bio });
    const sessionId = generateSessionId();
    sessions.set(sessionId, user._id.toString());

    res.json({
      success: true,
      user: user,
      sessionId: sessionId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin/validate", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.validatePassword(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const sessionId = generateSessionId();
    sessions.set(sessionId, user._id.toString());

    res.json({
      success: true,
      user: user,
      sessionId: sessionId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve React app for all non-API routes
app.use((req, res) => {
  // Only serve the React app if it's not an API request
  if (!req.path.startsWith("/api/")) {
    res.sendFile("index.html", { root: "frontend/public" });
  } else {
    // Return 404 for API routes that don't exist
    res.status(404).json({ error: "API endpoint not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
