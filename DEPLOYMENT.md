# GroupManager Deployment Guide

## Overview
GroupManager is a modern web application for small group management with role-based access control. This guide covers deployment to Windows IIS with SQL Server integration.

## Prerequisites

### System Requirements
- Windows Server with IIS enabled
- Node.js 18+ installed
- SQL Server 2019+ running on 10.10.0.1
- IIS with IISNode module installed

### SQL Server Setup
1. **Database Creation**: The application expects a SQL Server instance at `10.10.0.1`
2. **Authentication**: Uses SQL Server authentication with user `sa` and password `Admin@123`
3. **Database Name**: `GroupManager` (configurable via environment variables)

## Deployment Steps

### 1. Build the Application
```bash
# Install dependencies
npm install

# Build for production
npm run build
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
DB_SERVER=10.10.0.1
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=Admin@123
DB_NAME=GroupManager
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secure-jwt-secret
SESSION_SECRET=your-secure-session-secret
```

### 3. IIS Configuration

#### Create Application Pool
1. Open IIS Manager
2. Create new Application Pool named "GroupManager"
3. Set .NET CLR Version to "No Managed Code"
4. Set Process Model Identity to appropriate service account

#### Configure Website
1. Create new Website or Application
2. Set Physical Path to your application directory
3. Assign to GroupManager Application Pool
4. Set Bindings (typically port 80 or 443 for HTTPS)

#### web.config Setup
Create `web.config` in the root directory:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="dist/server/node-build.mjs" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="dist/server/node-build.mjs"/>
        </rule>
      </rules>
    </rewrite>
    <iisnode watchedFiles="web.config;*.js"/>
  </system.webServer>
</configuration>
```

### 4. SQL Server Database Initialization

The application uses mock data for offline development. For production deployment with SQL Server:

1. **Create Database Schema**:
```sql
CREATE DATABASE GroupManager;
USE GroupManager;

-- Users table
CREATE TABLE Users (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    username NVARCHAR(50) UNIQUE NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    passwordHash NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) CHECK (role IN ('manager', 'member')) NOT NULL,
    firstName NVARCHAR(100) NOT NULL,
    lastName NVARCHAR(100) NOT NULL,
    isActive BIT DEFAULT 1,
    createdAt DATETIME2 DEFAULT GETDATE(),
    lastLogin DATETIME2
);

-- Activity Log table
CREATE TABLE ActivityLog (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(id),
    userName NVARCHAR(200) NOT NULL,
    action NVARCHAR(100) NOT NULL,
    details NVARCHAR(500),
    timestamp DATETIME2 DEFAULT GETDATE()
);

-- Insert default admin user (password: admin123)
INSERT INTO Users (username, email, passwordHash, role, firstName, lastName) 
VALUES ('admin', 'admin@groupmanager.com', '$2b$10$hashed_password_here', 'manager', 'Admin', 'User');
```

2. **Update server code** to use actual SQL Server connections instead of mock data

### 5. Security Considerations

#### Network Security
- Ensure SQL Server is accessible only from the web server
- Use Windows Firewall to restrict database access
- Consider VPN or private network for database communication

#### Application Security
- Change default JWT and session secrets
- Implement proper password hashing (bcrypt)
- Enable HTTPS in production
- Regular security updates

#### Database Security
- Use dedicated SQL Server user (not sa) in production
- Implement principle of least privilege
- Regular database backups
- Monitor access logs

## Offline Deployment Features

### Self-contained Deployment
The application is designed for offline deployment:
- All dependencies bundled
- No external CDN dependencies
- Local asset serving
- Minimal external connections

### Backup and Recovery
1. **Database Backup**: Regular SQL Server backups
2. **Application Backup**: Full application directory
3. **Configuration Backup**: Environment files and certificates

## Monitoring and Maintenance

### Application Monitoring
- Check IIS application pool health
- Monitor Node.js process memory usage
- Review application logs

### Database Monitoring
- SQL Server performance counters
- Database growth monitoring
- Query performance analysis

### Log Files
- IIS logs: `C:\inetpub\logs\LogFiles\`
- Application logs: Configure via winston or similar
- SQL Server logs: SQL Server Error Log

## Troubleshooting

### Common Issues
1. **IISNode not working**: Verify IISNode installation and configuration
2. **Database connection fails**: Check SQL Server accessibility and credentials
3. **Static files not served**: Verify IIS static content handlers
4. **Authentication issues**: Check JWT secret configuration

### Support
For technical support with deployment, refer to:
- IIS documentation
- Node.js deployment guides
- SQL Server administration guides

## Production Considerations

### Performance Optimization
- Enable IIS compression
- Configure browser caching for static assets
- Optimize SQL Server queries
- Consider connection pooling

### Scalability
- Application can be load-balanced across multiple IIS servers
- Database clustering for high availability
- CDN for static assets (if external connectivity available)

### Backup Strategy
- Automated daily database backups
- Application deployment package retention
- Configuration file versioning
