const { MongoClient, ObjectId } = require("mongodb");

const connectionString = ;

const database = "sudoRepoDB";

let db;

// Initialize database connection
async function initDatabase() {
  try {
    const client = new MongoClient(connectionString);
    await client.connect();
    db = client.db(database);
    console.log("Connected to MongoDB");

    // Create sample data if collections are empty
    await createSampleData();
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

// User CRUD operations
class UserService {
  static async create(userData) {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password, // Store raw password
      bio: userData.bio || "",
      profile_picture:
        userData.profile_picture || "/assets/images/profilePlaceholder.png",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("users").insertOne(user);
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, _id: result.insertedId };
  }

  static async findByEmail(email) {
    return await db.collection("users").findOne({ email });
  }

  static async findById(id) {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  static async update(id, updateData) {
    updateData.updated_at = new Date();
    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    return await this.findById(id);
  }

  static async search(query) {
    const users = await db
      .collection("users")
      .find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      })
      .project({ password: 0 })
      .toArray();
    return users;
  }

  static async validatePassword(email, password) {
    const user = await this.findByEmail(email);
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}

// Project CRUD operations
class ProjectService {
  static async create(projectData) {
    const project = {
      name: projectData.name,
      description: projectData.description,
      type: projectData.type,
      tags: projectData.tags || [],
      version: projectData.version || "1.0.0",
      created_by: new ObjectId(projectData.created_by),
      created_at: new Date(),
      last_updated: new Date(),
      project_image:
        projectData.project_image || "/assets/images/imagePlaceholder.jpg",
      is_checked_out: false,
      checked_out_by: null,
      checked_out_at: null,
    };

    const result = await db.collection("projects").insertOne(project);

    // Add creator as owner in collaborators
    await db.collection("project_collaborators").insertOne({
      project_id: result.insertedId,
      user_id: new ObjectId(projectData.created_by),
      role: "owner",
      joined_at: new Date(),
    });

    return { ...project, _id: result.insertedId };
  }

  static async findById(id) {
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const project = await db
      .collection("projects")
      .findOne({ _id: new ObjectId(id) });
    if (project) {
      // Get collaborators
      const collaborators = await db
        .collection("project_collaborators")
        .aggregate([
          { $match: { project_id: new ObjectId(id) } },
          {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: "$user" },
          {
            $project: {
              role: 1,
              "user.username": 1,
              "user._id": 1,
            },
          },
        ])
        .toArray();

      project.collaborators = collaborators;

      // Map database fields to frontend-expected fields
      project.isCheckedOut = project.is_checked_out;
      project.checkedOutBy = project.checked_out_by;
      project.checkedOutAt = project.checked_out_at;
    }
    return project;
  }

  static async findAll(userId = null) {
    let query = {};
    if (userId) {
      // Find projects user is collaborating on
      const collaborations = await db
        .collection("project_collaborators")
        .find({
          user_id: new ObjectId(userId),
        })
        .toArray();
      const projectIds = collaborations.map((c) => c.project_id);
      query = { _id: { $in: projectIds } };
    }

    return await db.collection("projects").find(query).toArray();
  }

  static async search(query) {
    return await db
      .collection("projects")
      .find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { type: { $regex: query, $options: "i" } },
          { tags: { $in: [new RegExp(query, "i")] } },
        ],
      })
      .toArray();
  }

  static async checkOut(projectId, userId) {
    // Update project checkout status
    await db.collection("projects").updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: {
          is_checked_out: true,
          checked_out_by: new ObjectId(userId),
          checked_out_at: new Date(),
        },
      }
    );

    // Create checkout message in checkin history
    const checkoutMessage = {
      project_id: new ObjectId(projectId),
      user_id: new ObjectId(userId),
      message: "Project checked out",
      type: "checkout",
      timestamp: new Date(),
    };

    const checkinResult = await db
      .collection("checkins")
      .insertOne(checkoutMessage);

    // Create activity feed entry for checkout
    await db.collection("activity_feed").insertOne({
      user_id: new ObjectId(userId),
      type: "checkout",
      related_id: checkinResult.insertedId,
      timestamp: new Date(),
      visibility: "global",
      message: "Project checked out",
    });
  }

  static async checkIn(
    projectId,
    userId,
    message,
    fileUpdates = [],
    version = null
  ) {
    // Create checkin record
    const checkin = {
      project_id: new ObjectId(projectId),
      user_id: new ObjectId(userId),
      message: message,
      files_updated: fileUpdates.map((f) => new ObjectId(f)),
      timestamp: new Date(),
      version: version,
    };

    const checkinResult = await db.collection("checkins").insertOne(checkin);

    // Update project status and version
    const updateFields = {
      is_checked_out: false,
      checked_out_by: null,
      checked_out_at: null,
      last_updated: new Date(),
    };

    // Update version if provided
    if (version) {
      updateFields.version = version;
    }

    await db
      .collection("projects")
      .updateOne({ _id: new ObjectId(projectId) }, { $set: updateFields });

    // Create activity feed entry
    await db.collection("activity_feed").insertOne({
      user_id: new ObjectId(userId),
      type: "checkin",
      related_id: checkinResult.insertedId,
      timestamp: new Date(),
      visibility: "global",
      message: message,
      version: version,
    });

    return checkin;
  }

  static async delete(projectId, userId) {
    // Check if user is owner
    const collaboration = await db.collection("project_collaborators").findOne({
      project_id: new ObjectId(projectId),
      user_id: new ObjectId(userId),
      role: "owner",
    });

    if (!collaboration) {
      throw new Error("Only project owner can delete project");
    }

    // Delete project and related data
    await db.collection("projects").deleteOne({ _id: new ObjectId(projectId) });
    await db
      .collection("project_collaborators")
      .deleteMany({ project_id: new ObjectId(projectId) });
    await db
      .collection("files")
      .deleteMany({ project_id: new ObjectId(projectId) });
    await db
      .collection("checkins")
      .deleteMany({ project_id: new ObjectId(projectId) });

    return true;
  }

  static async update(projectId, userId, updateData) {
    // Check if user is owner or collaborator
    const collaboration = await db.collection("project_collaborators").findOne({
      project_id: new ObjectId(projectId),
      user_id: new ObjectId(userId),
      role: { $in: ["owner", "collaborator"] },
    });

    if (!collaboration) {
      throw new Error("Only project owner or collaborators can edit project");
    }

    // Update project
    updateData.last_updated = new Date();
    await db
      .collection("projects")
      .updateOne({ _id: new ObjectId(projectId) }, { $set: updateData });

    return await this.findById(projectId);
  }

  static async delete(projectId, userId) {
    // Check if user is owner
    const ownerCollaboration = await db
      .collection("project_collaborators")
      .findOne({
        project_id: new ObjectId(projectId),
        user_id: new ObjectId(userId),
        role: "owner",
      });

    if (!ownerCollaboration) {
      throw new Error("Only project owner can delete project");
    }

    // Delete all files associated with the project
    await db.collection("project_files").deleteMany({
      project_id: new ObjectId(projectId),
    });

    // Delete all collaborators
    await db.collection("project_collaborators").deleteMany({
      project_id: new ObjectId(projectId),
    });

    // Delete project activities
    await db.collection("activity_feed").deleteMany({
      project_id: new ObjectId(projectId),
    });

    // Delete the project
    await db.collection("projects").deleteOne({
      _id: new ObjectId(projectId),
    });

    return { success: true };
  }

  static async addCollaborator(
    projectId,
    userId,
    collaboratorEmail,
    role = "collaborator"
  ) {
    // Check if user is owner
    const ownerCollaboration = await db
      .collection("project_collaborators")
      .findOne({
        project_id: new ObjectId(projectId),
        user_id: new ObjectId(userId),
        role: "owner",
      });

    if (!ownerCollaboration) {
      throw new Error("Only project owner can add collaborators");
    }

    // Find collaborator by email
    const collaboratorUser = await db
      .collection("users")
      .findOne({ email: collaboratorEmail });
    if (!collaboratorUser) {
      throw new Error("User not found");
    }

    // Check if already a collaborator
    const existingCollaboration = await db
      .collection("project_collaborators")
      .findOne({
        project_id: new ObjectId(projectId),
        user_id: collaboratorUser._id,
      });

    if (existingCollaboration) {
      throw new Error("User is already a collaborator");
    }

    // Add collaborator
    await db.collection("project_collaborators").insertOne({
      project_id: new ObjectId(projectId),
      user_id: collaboratorUser._id,
      role: role,
      joined_at: new Date(),
    });

    return collaboratorUser;
  }

  static async removeCollaborator(projectId, userId, collaboratorId) {
    // Check if user is owner
    const ownerCollaboration = await db
      .collection("project_collaborators")
      .findOne({
        project_id: new ObjectId(projectId),
        user_id: new ObjectId(userId),
        role: "owner",
      });

    if (!ownerCollaboration) {
      throw new Error("Only project owner can remove collaborators");
    }

    // Don't allow removing the owner
    const targetCollaboration = await db
      .collection("project_collaborators")
      .findOne({
        project_id: new ObjectId(projectId),
        user_id: new ObjectId(collaboratorId),
      });

    if (targetCollaboration && targetCollaboration.role === "owner") {
      throw new Error("Cannot remove project owner");
    }

    // Remove collaborator
    await db.collection("project_collaborators").deleteOne({
      project_id: new ObjectId(projectId),
      user_id: new ObjectId(collaboratorId),
    });

    return true;
  }

  static async updateCollaboratorRole(
    projectId,
    userId,
    collaboratorId,
    newRole
  ) {
    // Check if user is owner
    const ownerCollaboration = await db
      .collection("project_collaborators")
      .findOne({
        project_id: new ObjectId(projectId),
        user_id: new ObjectId(userId),
        role: "owner",
      });

    if (!ownerCollaboration) {
      throw new Error("Only project owner can update collaborator roles");
    }

    // Don't allow changing owner role
    const targetCollaboration = await db
      .collection("project_collaborators")
      .findOne({
        project_id: new ObjectId(projectId),
        user_id: new ObjectId(collaboratorId),
      });

    if (targetCollaboration && targetCollaboration.role === "owner") {
      throw new Error("Cannot change owner role");
    }

    // Update role
    await db.collection("project_collaborators").updateOne(
      {
        project_id: new ObjectId(projectId),
        user_id: new ObjectId(collaboratorId),
      },
      {
        $set: { role: newRole },
      }
    );

    return true;
  }

  static async getCheckinHistory(projectId) {
    const checkins = await db
      .collection("checkins")
      .aggregate([
        { $match: { project_id: new ObjectId(projectId) } },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            message: 1,
            version: 1,
            type: 1,
            timestamp: 1,
            user: {
              _id: "$user._id",
              username: "$user.username",
              email: "$user.email",
            },
          },
        },
        { $sort: { timestamp: -1 } },
      ])
      .toArray();

    return checkins;
  }
}

// Friend CRUD operations
class FriendService {
  static async sendRequest(userId, friendId) {
    const friend = {
      user_id: new ObjectId(userId),
      friend_id: new ObjectId(friendId),
      status: "pending",
      created_at: new Date(),
      accepted_at: null,
    };

    return await db.collection("friends").insertOne(friend);
  }

  static async acceptRequest(userId, friendId) {
    await db.collection("friends").updateOne(
      {
        user_id: new ObjectId(friendId),
        friend_id: new ObjectId(userId),
        status: "pending",
      },
      {
        $set: {
          status: "accepted",
          accepted_at: new Date(),
        },
      }
    );

    // Create reverse relationship
    await db.collection("friends").insertOne({
      user_id: new ObjectId(userId),
      friend_id: new ObjectId(friendId),
      status: "accepted",
      created_at: new Date(),
      accepted_at: new Date(),
    });
  }

  static async getFriends(userId) {
    return await db
      .collection("friends")
      .aggregate([
        {
          $match: {
            user_id: new ObjectId(userId),
            status: "accepted",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "friend_id",
            foreignField: "_id",
            as: "friend",
          },
        },
        { $unwind: "$friend" },
        {
          $project: {
            "friend.username": 1,
            "friend._id": 1,
            "friend.profile_picture": 1,
            "friend.bio": 1,
          },
        },
      ])
      .toArray();
  }

  static async unfriend(userId, friendId) {
    await db.collection("friends").deleteMany({
      $or: [
        { user_id: new ObjectId(userId), friend_id: new ObjectId(friendId) },
        { user_id: new ObjectId(friendId), friend_id: new ObjectId(userId) },
      ],
    });
  }

  static async declineRequest(userId, requesterId) {
    await db.collection("friends").deleteOne({
      user_id: new ObjectId(requesterId),
      friend_id: new ObjectId(userId),
      status: "pending",
    });
  }

  static async getFriendshipStatus(userId, otherUserId) {
    // Check if there's a pending request from current user to other user
    const sentRequest = await db.collection("friends").findOne({
      user_id: new ObjectId(userId),
      friend_id: new ObjectId(otherUserId),
    });

    // Check if there's a pending request from other user to current user
    const receivedRequest = await db.collection("friends").findOne({
      user_id: new ObjectId(otherUserId),
      friend_id: new ObjectId(userId),
    });

    if (
      sentRequest?.status === "accepted" ||
      receivedRequest?.status === "accepted"
    ) {
      return "friends";
    } else if (sentRequest?.status === "pending") {
      return "request_sent";
    } else if (receivedRequest?.status === "pending") {
      return "request_received";
    } else {
      return "none";
    }
  }

  static async getPendingRequests(userId) {
    return await db
      .collection("friends")
      .aggregate([
        {
          $match: {
            friend_id: new ObjectId(userId),
            status: "pending",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "sender",
          },
        },
        { $unwind: "$sender" },
        {
          $project: {
            _id: 1,
            "sender._id": 1,
            "sender.username": 1,
            "sender.profile_picture": 1,
            "sender.bio": 1,
            created_at: 1,
          },
        },
      ])
      .toArray();
  }
}

// Activity Feed operations
class ActivityService {
  static async getGlobalFeed(limit = 20) {
    return await db
      .collection("activity_feed")
      .aggregate([
        { $match: { visibility: "global" } },
        { $sort: { timestamp: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $lookup: {
            from: "checkins",
            localField: "related_id",
            foreignField: "_id",
            as: "checkin",
          },
        },
        {
          $lookup: {
            from: "projects",
            localField: "checkin.project_id",
            foreignField: "_id",
            as: "project",
          },
        },
      ])
      .toArray();
  }

  static async getFriendsFeed(userId, limit = 20) {
    // Get user's friends
    const friends = await db
      .collection("friends")
      .find({
        user_id: new ObjectId(userId),
        status: "accepted",
      })
      .toArray();

    const friendIds = friends.map((f) => f.friend_id);
    friendIds.push(new ObjectId(userId)); // Include user's own activity

    return await db
      .collection("activity_feed")
      .aggregate([
        {
          $match: {
            user_id: { $in: friendIds },
            visibility: { $in: ["global", "friends"] },
          },
        },
        { $sort: { timestamp: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $lookup: {
            from: "checkins",
            localField: "related_id",
            foreignField: "_id",
            as: "checkin",
          },
        },
        {
          $lookup: {
            from: "projects",
            localField: "checkin.project_id",
            foreignField: "_id",
            as: "project",
          },
        },
      ])
      .toArray();
  }

  static async searchActivities(query) {
    return await db
      .collection("activity_feed")
      .aggregate([
        {
          $match: {
            $or: [
              { message: { $regex: query, $options: "i" } },
              { type: { $regex: query, $options: "i" } },
            ],
            visibility: "global",
          },
        },
        { $sort: { timestamp: -1 } },
        { $limit: 50 },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            _id: 1,
            message: 1,
            type: 1,
            timestamp: 1,
            "user._id": 1,
            "user.username": 1,
            "user.profile_picture": 1,
          },
        },
      ])
      .toArray();
  }
}

// File operations
class FileService {
  static async create(fileData) {
    const file = {
      project_id: new ObjectId(fileData.project_id),
      filename: fileData.filename,
      content: fileData.content,
      last_modified: new Date(),
      last_modified_by: new ObjectId(fileData.last_modified_by),
      size: fileData.size || 0,
      type: fileData.type || "text/plain",
      is_uploaded: fileData.is_uploaded || false,
    };

    return await db.collection("files").insertOne(file);
  }

  static async getByProject(projectId) {
    return await db
      .collection("files")
      .find({
        project_id: new ObjectId(projectId),
      })
      .toArray();
  }

  static async getById(fileId) {
    return await db.collection("files").findOne({ _id: new ObjectId(fileId) });
  }

  static async update(fileId, content, userId) {
    await db.collection("files").updateOne(
      { _id: new ObjectId(fileId) },
      {
        $set: {
          content: content,
          last_modified: new Date(),
          last_modified_by: new ObjectId(userId),
        },
      }
    );
  }

  static async delete(fileId) {
    await db.collection("files").deleteOne({ _id: new ObjectId(fileId) });
  }
}

// Create sample data
async function createSampleData() {
  try {
    // Clear existing data and recreate with raw passwords
    await db.collection("users").deleteMany({});
    await db.collection("projects").deleteMany({});
    await db.collection("project_collaborators").deleteMany({});
    await db.collection("files").deleteMany({});
    await db.collection("checkins").deleteMany({});
    await db.collection("activity_feed").deleteMany({});
    await db.collection("friends").deleteMany({});

    // Create 2+ user profiles
    const user1 = await UserService.create({
      username: "Salty",
      email: "salty@gmail.com",
      password: "password123!",
      bio: "Full-stack developer passionate about creating innovative web applications.",
    });

    const user2 = await UserService.create({
      username: "Prickly",
      email: "prickly@gmail.com",
      password: "password123!",
      bio: "Frontend developer who loves React and modern web technologies.",
    });

    const user3 = await UserService.create({
      username: "Gerald",
      email: "gerald@gmail.com",
      password: "password123!",
      bio: "Backend engineer specializing in Node.js and database design.",
    });

    // Create 2+ projects
    const project1 = await ProjectService.create({
      name: "React Program",
      description: "A personal project website built with React.",
      type: "Web Development",
      tags: ["React", "Bootstrap", "JavaScript"],
      created_by: user1._id.toString(),
    });

    const project2 = await ProjectService.create({
      name: "My first Project",
      description: "A simple starter project to teach me how to code :)",
      type: "Backend",
      tags: ["Node.js", "Express", "MongoDB"],
      created_by: user2._id.toString(),
    });

    // Create sample files for projects
    await FileService.create({
      project_id: project1._id.toString(),
      filename: "index.html",
      content:
        "<!DOCTYPE html><html><head><title>Portfolio</title></head><body><h1>My Portfolio</h1></body></html>",
      last_modified_by: user1._id.toString(),
      size: 120,
    });

    await FileService.create({
      project_id: project1._id.toString(),
      filename: "styles.css",
      content:
        "body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }",
      last_modified_by: user1._id.toString(),
      size: 65,
    });

    await FileService.create({
      project_id: project2._id.toString(),
      filename: "server.js",
      content:
        "const express = require('express'); const app = express(); app.listen(3000);",
      last_modified_by: user2._id.toString(),
      size: 75,
    });

    await FileService.create({
      project_id: project2._id.toString(),
      filename: "package.json",
      content:
        '{"name": "project-1", "version": "1.0.0", "dependencies": {"express": "^5.1.0"}}',
      last_modified_by: user2._id.toString(),
      size: 95,
    });

    // Create 3+ check-ins with corresponding messages
    await ProjectService.checkIn(
      project1._id.toString(),
      user1._id.toString(),
      "Initial project setup with basic HTML structure and landing page",
      []
    );

    await ProjectService.checkIn(
      project1._id.toString(),
      user1._id.toString(),
      "Added CSS styling and responsive design for better user experience",
      []
    );

    await ProjectService.checkIn(
      project2._id.toString(),
      user2._id.toString(),
      "Implemented Express server setup and basic API routing structure",
      []
    );

    // Add collaborators to projects
    await ProjectService.addCollaborator(
      project1._id.toString(),
      user1._id.toString(),
      "prickly@gmail.com",
      "collaborator"
    );
    await ProjectService.addCollaborator(
      project2._id.toString(),
      user2._id.toString(),
      "gerald@gmail.com",
      "collaborator"
    );

    // Create friendships
    await FriendService.sendRequest(user1._id.toString(), user2._id.toString());
    await FriendService.acceptRequest(
      user1._id.toString(),
      user2._id.toString()
    );

    await FriendService.sendRequest(user2._id.toString(), user3._id.toString());
    await FriendService.acceptRequest(
      user2._id.toString(),
      user3._id.toString()
    );
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
}

module.exports = {
  initDatabase,
  UserService,
  ProjectService,
  FriendService,
  ActivityService,
  FileService,
};

