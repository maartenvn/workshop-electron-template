<script setup>
import { ref, onMounted } from "vue";

// Lijst met alle notificaties
const notifications = ref([]);

// Modal om een notificatie toe te voegen
const modalAddOpen = ref(false);
const modalAddTitle = ref("");
const modalAddContent = ref("");
const modalAddDate = ref("");
const modalAddTime = ref("");

// Haal de notificaties op van de file
const restoreNotifications = async () => {
  // TODO: Haal de notificaties op van de file via IPC.
  // ...
  /*notifications.value = TODO */
};

// Toon een notificatie
const showNotification = async (title, content) => {
  // TODO: test de notificatie via IPC.
  // ...
};

// Voeg een notitificatie toe aan de lijst
const addNotification = async () => {
  const notification = {
    id: notifications.value.length,
    title: modalAddTitle.value,
    content: modalAddContent.value,
    date: new Date(`${modalAddDate.value} ${modalAddTime.value}`),
  };
  notifications.value.push(notification);

  // TODO: voeg de notificatie toe aan de file via IPC.
  // ...

  // Sluit de modal
  modalAddOpen.value = false;

  // Clear de velden
  modalAddTitle.value = "";
  modalAddContent.value = "";
  modalAddDate.value = "";
  modalAddTime.value = "";
};

// Verwijder een notificatie uit de lijst
const removeNotification = async id => {
  notifications.value = notifications.value.filter(notification => notification.id !== id);

  // TODO: verwijder de notificatie uit de file via IPC.
  // ...
};

onMounted(async () => {
  await restoreNotifications();
});
</script>

<template>
  <main class="container">
    <!-- Header -->
    <div class="heading">
      <div class="title">Notificaties Planner</div>
      <div class="right-align">
        <button class="transparent circle" @click="modalAddOpen = true">
          <i>add</i>
        </button>
      </div>
    </div>

    <!-- Tabel met notificaties -->
    <table class="border">
      <thead>
        <tr>
          <th>Titel</th>
          <th>Inhoud</th>
          <th>Datum</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notification, index) of notifications" :key="index">
          <td>{{ notification.title }}</td>
          <td>{{ notification.content }}</td>
          <td>{{ notification.date.toLocaleString() }}</td>
          <td>
            <div class="right-align">
              <button class="transparent circle" @click="removeNotification(notification.id)">
                <i>delete</i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>

  <!-- Modal om toe te voegen -->
  <div class="modal max" :class="{ active: modalAddOpen }">
    <h5>Voeg een notificatie toe</h5>

    <div class="field label border">
      <input v-model="modalAddTitle" type="text" />
      <label>Titel</label>
    </div>

    <div class="field label border">
      <input v-model="modalAddContent" type="text" />
      <label>Inhoud</label>
    </div>

    <div class="field label border">
      <input v-model="modalAddDate" type="date" />
      <label class="active">Datum</label>
    </div>

    <div class="field label border">
      <input v-model="modalAddTime" type="time" />
      <label class="active">Tijd</label>
    </div>

    <button @click="showNotification(modalAddTitle, modalAddContent)">Test de notificatie</button>

    <nav class="right-align">
      <button class="border" @click="modalAddOpen = false">Annuleren</button>
      <button @click="addNotification">Toevoegen</button>
    </nav>
  </div>
</template>
