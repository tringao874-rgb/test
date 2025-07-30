import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleAuthCheck } from "./routes/auth";
import {
  handleGetStats,
  handleGetRecentActivity,
  handleGetFullActivity,
} from "./routes/stats";
import { initializeDatabase } from "./db/config";

export function createServer() {
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

  return app;
}
