/**
 * @typedef {Object} DatabaseConfig
 * @property {string} server
 * @property {number} port
 * @property {string} user
 * @property {string} password
 * @property {string} database
 * @property {Object} options
 * @property {boolean} options.encrypt
 * @property {boolean} options.trustServerCertificate
 * @property {boolean} options.enableArithAbort
 */

/** @type {DatabaseConfig} */
const dbConfig = {
  server: process.env.DB_SERVER || "10.10.0.1",
  port: parseInt(process.env.DB_PORT || "1433"),
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "Admin@123",
  database: process.env.DB_NAME || "GroupManager",
  options: {
    encrypt: false, // Set to true for Azure
    trustServerCertificate: true, // For self-signed certificates
    enableArithAbort: true,
  },
};

// Database initialization script for SQL Server
const initializeDatabase = async () => {
  // This will be implemented when SQL Server connection is established
  // For now, we'll use mock data for offline development
  console.log(
    "Database configuration ready for SQL Server at:",
    dbConfig.server,
  );
  console.log("Note: Currently using mock data for offline development");
};

module.exports = {
  dbConfig,
  initializeDatabase,
};
