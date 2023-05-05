const { app, Notification } = require("electron");
const path = require("path");
const fs = require("fs");

// Pad naar de appdata map.
const appdataPath = app.getPath("userData");
// Pad naar het notificaties bestand.
const notificationsPath = path.join(appdataPath, "notifications.json");

/**
 * Toon een notificatie.
 * @param title Titel van de notificatie.
 * @param content Inhoud van de notificatie.
 */
function showNotification(title, content) {
  // TODO: maak een notificatie aan en toon deze
  // Referentie: https://www.electronjs.org/docs/latest/tutorial/notifications
  // ...
}

// -----------------------------------------------------
// Pas hieronder niets aan!
// -----------------------------------------------------

/**
 * Ophalen van notificaties uit het notificaties bestand.
 */
function getNotifications() {
  try {
    // Maak het notificaties bestand aan als het niet bestaat.
    if (!fs.existsSync(notificationsPath)) {
      fs.writeFileSync(notificationsPath, "[]");
    }

    // Lees het notificaties bestand uit.
    const notifications = fs.readFileSync(notificationsPath, "utf-8");

    // Parse de JSON data.
    return JSON.parse(notifications)?.map?.(notification => ({
      ...notification,
      date: new Date(notification.date),
    }));
  } catch {
    return [];
  }
}

/**
 * Toevoegen van een notificatie aan het notificaties bestand.
 * @param title Titel van de notificatie.
 * @param content Inhoud van de notificatie.
 * @param date Datum wanneer de notificatie getoond moet worden.
 */
function addNotification(id, title, content, date) {
  console.log(`Notificatie "${title}" werd ingepland.`);
  // Notificatie moet geldig zijn.
  if (id === undefined || title === undefined || content === undefined || date === undefined) {
    throw Error("Ongeldige notificatie");
  }

  const notifications = getNotifications();
  // Toevoegen van de notificatie.
  notifications.push({
    id,
    title,
    content,
    date,
  });
  // Schrijf de notificaties naar het notificaties bestand.
  fs.writeFileSync(notificationsPath, JSON.stringify(notifications));
  // Herplan alle notificaties.
  scheduleNotifications();
}

/**
 * Verwijderen van een notificatie uit het notificaties bestand.
 * @param id ID van de notificatie.
 */
function removeNotification(id) {
  let notifications = getNotifications();
  // Verwijder de notificatie uit de lijst.
  notifications = notifications.filter(notification => notification.id !== id);
  // Schrijf de notificaties naar het notificaties bestand.
  fs.writeFileSync(notificationsPath, JSON.stringify(notifications));
  // Herplan alle notificaties.
  scheduleNotifications();
  console.log(`Notificatie met id "${id}" werd verwijderd.`);
}

/**
 * Inplannen van alle notificaties
 */
const scheduledNotifications = [];
function scheduleNotifications() {
  const notifications = getNotifications();

  // Clear alle voordien geplande notificaties
  for (const task of scheduledNotifications) {
    clearTimeout(task);
  }

  // Plan alle notificaties
  for (const notification of notifications) {
    // Plan geen notificaties die al getoond zijn
    if (notification.shown) continue;

    // Inplannen
    const now = new Date().getTime();
    const delay = new Date(notification.date) - now;
    const task = setTimeout(() => {
      // Toon de notificatie
      showNotification(notification.title, notification.content);

      // Markeer de notificatie als gelezen
      const notifications = getNotifications();
      const index = notifications.findIndex(n => n.id === notification.id);
      notifications[index].shown = true;
      fs.writeFileSync(notificationsPath, JSON.stringify(notifications));
    }, delay);

    scheduledNotifications.push(task);
  }
}

module.exports = {
  showNotification,
  getNotifications,
  addNotification,
  removeNotification,
  scheduleNotifications,
};
