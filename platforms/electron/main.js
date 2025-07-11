const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Memory monitoring configuration
const MEMORY_MONITOR_INTERVAL_MS = 30000; // 30 seconds
const MEMORY_USAGE_THRESHOLD_MB = 1024; // 1 GB

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // --- Security Settings ---
      // Enables the sandbox, which isolates the renderer process from the OS.
      // This is a critical security feature.
      sandbox: true,
      // Disables Node.js integration in the renderer process.
      // All backend logic should be handled in the main process or exposed via a preload script.
      nodeIntegration: false,
      // Isolates the renderer's JavaScript context from the preload script's context.
      contextIsolation: true,
      // --- Preload Script for React/Renderer Integration ---
      // A preload script is necessary to bridge the sandboxed renderer and the main process.
      // It can securely expose APIs (like ipcRenderer) to the React app.
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // --- React 18 Integration ---
  // Load the index.html of the app. This file is the entry point for the React application,
  // which would be built by a tool like Vite or Create React App.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../../app/index.html'), // Assumes the built React app is at app/index.html
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  // Open the DevTools for debugging.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null;
  });
}

/**
 * Monitors memory usage and triggers cleanup if a threshold is exceeded.
 * In a real-world application, "unloading libraries" could mean:
 * - Clearing in-memory caches.
 * - Signaling modules to release unused resources.
 * - Potentially restarting worker processes if the architecture supports it.
 */
function startMemoryMonitor() {
  setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const rssMb = memoryUsage.rss / (1024 * 1024);

    console.log(`Current memory usage (RSS): ${rssMb.toFixed(2)} MB`);

    if (rssMb > MEMORY_USAGE_THRESHOLD_MB) {
      console.warn(`Memory usage (${rssMb.toFixed(2)} MB) has exceeded the threshold of ${MEMORY_USAGE_THRESHOLD_MB} MB.`);
      console.warn('Triggering dynamic library unloading/cleanup procedures...');
      // Placeholder for actual cleanup logic.
      // For example, notify modules via ipcMain to clear their caches.
      // if (mainWindow) {
      //   mainWindow.webContents.send('clear-cache-request');
      // }
    }
  }, MEMORY_MONITOR_INTERVAL_MS);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  createWindow();
  startMemoryMonitor();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});