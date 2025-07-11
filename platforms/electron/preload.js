const { contextBridge, ipcRenderer } = require('electron');

// Expose a limited set of APIs to the renderer process.
// This is a secure way to allow communication between the sandboxed
// renderer and the main process.
contextBridge.exposeInMainWorld('electronAPI', {
  // Example of exposing an IPC function
  // send: (channel, data) => ipcRenderer.send(channel, data),
  // receive: (channel, func) => {
  //   ipcRenderer.on(channel, (event, ...args) => func(...args));
  // }
});

console.log('Preload script loaded.');