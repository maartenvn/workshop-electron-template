const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // TODO: toon een notificatie via IPC.
  // ...
  // TODO: vraag via IPC de notificaties op.
  // ...
  // TODO: voeg via IPC een notificatie toe.
  // ...
  // TODO: verwijder via IPC een notificatie.
  // ...
});
