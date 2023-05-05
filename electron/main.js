// Importeer de Electron JS dependency.
const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require("electron");
const {
  getNotifications,
  addNotification,
  removeNotification,
  showNotification,
  scheduleNotifications,
} = require("./services/notifications");
const path = require("path");

// Main window
let mainWindow = null;

// Functie voor het maken van een scherm.
async function createWindow() {
  // Maak een scherm aan met een bepaalde resolutie.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  // Inladen van de Vite Development Server in development.
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  }
  // Inladen van de index.html van de build in productie.
  else {
    mainWindow.loadFile("dist-vue/index.html");
  }

  // Wanneer het scherm gesloten wordt, zet de referentie naar het scherm op null.
  // Dit is later nodig voor het tray icon.
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Wanneer Electron klaar is met opstarten,
// maak het scherm aan.
app.whenReady().then(() => {
  createWindow();

  // TODO: IPC handle voor het tonen van een notificatie (gebruik showNotification)
  // ...

  // TODO: IPC handle voor het ophalen van notificaties (gebruik getNotifications)
  // ...

  // TODO: IPC handle voor het toevoegen van een notificatie (gebruik addNotification)
  // ...

  // TODO: IPC handle voor het verwijderen van een notificatie (gebruik removeNotification)
  // ...

  // TODO: tray icon & context menu om applicatie naar de voorgrond te brengen
  // ...

  // Schedule alle notificaties.
  scheduleNotifications();
});

// Voorkom dat de applicatie sluit wanneer alle schermen gesloten zijn.
// Dit zal later nodig zijn voor het tray icon geldig te houden bij het sluiten van de applicatie.
app.on("window-all-closed", event => {
  app.dock.hide();
  event.preventDefault();
});
