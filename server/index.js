require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { handleDemo } = require("./routes/demo");
const { handleLogin, handleAuthCheck } = require("./routes/auth");
const { handleGetStats, handleGetRecentActivity, handleGetFullActivity } = require("./routes/stats");
const { handleGetProjects, handleCreateProject, handleUpdateProject } = require("./routes/projects");
const { handleGetTasks, handleCreateTask, handleUpdateTask } = require("./routes/tasks");
const { handleGetUsers, handleCreateUser, handleUpdateUser, handleDeleteUser } = require("./routes/users");
const { handleGetMessages, handleSendMessage, handleGetPrivateMessages, handleSendPrivateMessage } = require("./routes/chat");
const { initializeDatabase } = require("./db/config");

function createServer() {
  const app = express();

  // Initialize database connection
  initializeDatabase().catch(console.error);

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/login", handleLogin);
  app.get("/api/auth/check", handleAuthCheck);

  // Stats and activity routes
  app.get("/api/stats", handleGetStats);
  app.get("/api/activity/recent", handleGetRecentActivity);
  app.get("/api/activity/full", handleGetFullActivity);

  // Project routes
  app.get("/api/projects", handleGetProjects);
  app.post("/api/projects", handleCreateProject);
  app.put("/api/projects/:id", handleUpdateProject);

  // Task routes
  app.get("/api/tasks", handleGetTasks);
  app.post("/api/tasks", handleCreateTask);
  app.put("/api/tasks/:id", handleUpdateTask);

  // User management routes
  app.get("/api/users", handleGetUsers);
  app.post("/api/users", handleCreateUser);
  app.put("/api/users/:id", handleUpdateUser);
  app.delete("/api/users/:id", handleDeleteUser);

  // Chat routes
  app.get("/api/chat/messages", handleGetMessages);
  app.post("/api/chat/messages", handleSendMessage);
  app.get("/api/chat/private/:userId", handleGetPrivateMessages);
  app.post("/api/chat/private/:userId", handleSendPrivateMessage);

  return app;
}

module.exports = { createServer };
