// Mock users for demonstration (replace with SQL Server queries)
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@groupmanager.com",
    role: "manager",
    firstName: "Admin",
    lastName: "User",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    username: "user",
    email: "user@groupmanager.com",
    role: "member",
    firstName: "Regular",
    lastName: "User",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: new Date().toISOString(),
  },
];

// Mock password check (replace with proper hashing and SQL Server)
const mockPasswords = {
  admin: "admin123",
  user: "user123",
};

// Simple JWT-like token generation (replace with proper JWT in production)
const generateToken = (userId) => {
  return Buffer.from(
    JSON.stringify({ userId, timestamp: Date.now() }),
  ).toString("base64");
};

const verifyToken = (token) => {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    // In production, add proper expiration check and JWT verification
    return decoded.userId;
  } catch {
    return null;
  }
};

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user (replace with SQL Server query)
    const user = mockUsers.find((u) => u.username === username);

    if (!user || mockPasswords[username] !== password) {
      const response = {
        success: false,
        message: "Invalid username or password",
      };
      return res.status(401).json(response);
    }

    // Generate token
    const token = generateToken(user.id);

    // Update last login (replace with SQL Server update)
    user.lastLogin = new Date().toISOString();

    const response = {
      success: true,
      user,
      token,
    };

    res.json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const handleAuthCheck = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      const response = {
        isAuthenticated: false,
      };
      return res.json(response);
    }

    const userId = verifyToken(token);
    if (!userId) {
      const response = {
        isAuthenticated: false,
      };
      return res.json(response);
    }

    // Find user (replace with SQL Server query)
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) {
      const response = {
        isAuthenticated: false,
      };
      return res.json(response);
    }

    const response = {
      isAuthenticated: true,
      user,
    };

    res.json(response);
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({
      isAuthenticated: false,
    });
  }
};

module.exports = {
  handleLogin,
  handleAuthCheck,
};
