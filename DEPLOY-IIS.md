# Quick IIS Deployment Guide (JavaScript Only)

## Pre-built JavaScript Deployment

This application is now configured to use **JavaScript only** for IIS compatibility.

### 📦 Build Steps (on machine with internet)

```bash
# 1. Install dependencies
npm install

# 2. Build application (creates dist/ folder)
npm run build
```

This creates:
- `dist/spa/` - Frontend static files
- `dist/server/` - Backend JavaScript files (NO .ts files)

### 🚀 IIS Deployment Steps

1. **Copy Files**
   - Copy entire project folder to your Windows server
   - Ensure `dist/` folder exists with built files

2. **Environment Setup**
   - Create `.env` file:
   ```env
   DB_SERVER=10.10.0.1
   DB_USER=sa
   DB_PASSWORD=Admin@123
   DB_NAME=GroupManager
   NODE_ENV=production
   PORT=80
   ```

3. **IIS Configuration**
   - Install **iisnode** if not already installed
   - Create Application Pool: "GroupManager" 
   - Set .NET CLR Version: **"No Managed Code"**
   - Point physical path to your application folder
   - Ensure `web.config` exists in root

4. **Files Required for IIS**
   - ✅ `web.config` (already configured)
   - ✅ `dist/server/node-build.js` (entry point)
   - ✅ `dist/server/index.js` (main server)
   - ✅ `dist/spa/index.html` (frontend)

### 🔧 Entry Point

IIS will execute: `dist/server/node-build.js`

This file automatically:
- Loads the Express server from `index.js`
- Serves static files from `dist/spa/`
- Handles API routes at `/api/*`
- Connects to SQL Server at `10.10.0.1`

### ✅ JavaScript Only

- **No TypeScript files** in build output
- **No compilation** needed on server
- **Pure JavaScript** execution
- **IIS compatible** setup

### 🔍 Verification

After deployment, test:
- Main page: `http://your-server/`
- API health: `http://your-server/api/ping`
- Login page: `http://your-server/login`

All files are now JavaScript and ready for IIS deployment!
