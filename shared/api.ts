/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * User role types
 */
export type UserRole = "manager" | "member";

/**
 * User interface
 */
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

/**
 * Authentication request/response types
 */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface AuthCheckResponse {
  isAuthenticated: boolean;
  user?: User;
}

/**
 * Group member management types
 */
export interface GroupMember {
  id: string;
  user: User;
  joinedAt: string;
  status: "active" | "inactive" | "pending";
}

export interface GroupStats {
  totalMembers: number;
  activeMembers: number;
  managersCount: number;
  membersCount: number;
}

/**
 * Activity log types
 */
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
