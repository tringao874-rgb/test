import { RequestHandler } from "express";
import { GroupStats, ActivityLog, ApiResponse } from "@shared/api";

// Mock data for demonstration (replace with SQL Server queries)
const mockStats: GroupStats = {
  totalMembers: 12,
  activeMembers: 10,
  managersCount: 2,
  membersCount: 10,
};

const mockActivity: ActivityLog[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    action: "User Login",
    details: "Logged in from 192.168.1.100",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    userId: "2",
    userName: "Jane Smith",
    action: "Member Added",
    details: "Added new member: Mike Johnson",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    userId: "3",
    userName: "Bob Wilson",
    action: "Profile Updated",
    details: "Updated contact information",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    userId: "1",
    userName: "Admin User",
    action: "Settings Updated",
    details: "Modified group permissions",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    userId: "4",
    userName: "Sarah Johnson",
    action: "User Login",
    details: "Logged in from 10.0.0.15",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

export const handleGetStats: RequestHandler = async (req, res) => {
  try {
    // In production, replace with SQL Server query
    // SELECT COUNT(*) as totalMembers FROM Users WHERE isActive = 1
    // SELECT COUNT(*) as activeMembers FROM Users WHERE lastLogin > DATEADD(day, -1, GETDATE())
    // etc.

    const response: ApiResponse<GroupStats> = {
      success: true,
      data: mockStats,
    };

    res.json(response);
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch stats",
    });
  }
};

export const handleGetRecentActivity: RequestHandler = async (req, res) => {
  try {
    // In production, replace with SQL Server query
    // SELECT TOP 10 * FROM ActivityLog ORDER BY timestamp DESC

    const response: ApiResponse<ActivityLog[]> = {
      success: true,
      data: mockActivity.slice(0, 5), // Return last 5 activities
    };

    res.json(response);
  } catch (error) {
    console.error("Activity error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch activity",
    });
  }
};

export const handleGetFullActivity: RequestHandler = async (req, res) => {
  try {
    // In production, replace with SQL Server query with pagination
    // SELECT * FROM ActivityLog ORDER BY timestamp DESC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY

    const response: ApiResponse<ActivityLog[]> = {
      success: true,
      data: mockActivity,
    };

    res.json(response);
  } catch (error) {
    console.error("Full activity error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch full activity log",
    });
  }
};
