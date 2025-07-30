# ✅ IIS Deployment Checklist

## Files Ready for Deployment

### ✅ JavaScript Build Complete
- **Server files**: All `.js` files (NO `.ts` files)
- **Entry point**: `dist/server/node-build.js`
- **Frontend**: `dist/spa/index.html` + assets

### 📁 Required Files Structure
```
YourAppFolder/
├── dist/
│   ├── server/
│   │   ├── node-build.js    ← IIS entry point
│   │   ├── index.js         ← Main server
│   │   ├── db/config.js     ← Database config
│   │   └── routes/*.js      ← API routes
│   └── spa/
│       ├── index.html       ← Frontend entry
│       └── assets/          ← CSS/JS bundles
├── web.config               ← IIS configuration
├── .env                     ← Your environment
└── package.json
```

## 🔧 IIS Setup Steps

### 1. Prerequisites
- [ ] **IISNode installed** on Windows server
- [ ] **Node.js** installed on server
- [ ] **SQL Server** accessible at `10.10.0.1`

### 2. IIS Configuration
- [ ] Create Application Pool: **"GroupManager"**
- [ ] Set .NET CLR Version: **"No Managed Code"**
- [ ] Set Physical Path to your application folder
- [ ] Verify `web.config` points to `dist/server/node-build.js`

### 3. Environment Setup
Create `.env` file:
```env
DB_SERVER=10.10.0.1
DB_USER=sa
DB_PASSWORD=Admin@123
DB_NAME=GroupManager
NODE_ENV=production
```

### 4. Handler Mappings
Verify in IIS Manager → Handler Mappings:
- [ ] **iisnode** handler exists
- [ ] Maps to `*.js` files
- [ ] Module: `iisnode`

## 🧪 Testing

After deployment, test these URLs:

1. **Main App**: `http://your-server/`
   - Should show login page

2. **API Health**: `http://your-server/api/ping`
   - Should return: `{"message":"ping"}`

3. **Static Assets**: `http://your-server/assets/index-*.js`
   - Should load JavaScript bundle

## 🚨 Troubleshooting

### If you get 500 errors:
1. Check **iisnode** is installed
2. Verify **Node.js** path in System PATH
3. Check **web.config** points to correct entry file
4. Ensure **Application Pool** is "No Managed Code"

### If API doesn't work:
1. Check **SQL Server** is accessible from web server
2. Verify **database credentials** in `.env`
3. Check **iisnode** logs in `/iisnode/` folder

## 🎯 Success Indicators

- ✅ Login page loads
- ✅ Can log in with: admin/admin123
- ✅ Dashboard shows with navigation
- ✅ All menu items work (Chat, Projects, Tasks, etc.)
- ✅ No 500 errors in browser console

## 📦 Complete Package

Your deployment package now contains:
- **Pure JavaScript** server (no TypeScript)
- **Compiled React** frontend
- **IIS-ready** configuration
- **SQL Server** integration
- **Offline capable** (no internet required)

Ready for Windows IIS deployment! 🚀
