<template>
  <div class="nav-notes__separator">
    <span class="nav-notes__separator-text"
      >{{ !pinnedType ? "All" : "Pinned" }} Notes ({{ notes.length }})</span
    >
  </div>
  <ul v-if="notes.length" class="nav-notes__list nav-notes__list--pinned">
    <li
      v-for="note in notes"
      :key="note.id + `${pinnedType ? 'notes' : 'pinned'}`"
      class="nav-notes__item"
    >
      <router-link
        :to="{ name: 'note', params: { id: note.id } }"
        class="nav-notes__link"
      >
        <span class="nav-notes__date">{{
          this.$formatDate(note.dateCreate)
        }}</span>
        {{ note.title }}
      </router-link>
      <div class="category">
        <div
          v-for="(c, idx) in note.category"
          :key="idx + 'category-pinned'"
          :class="['category-item', 'c' + idx, { active: c === true }]"
        ></div>
      </div>
      <font-awesome-icon
        v-if="!note.pinned"
        :icon="['far', 'fa-star']"
        class="nav-notes__icon nav-notes__icon--pinned"
        @click="togglePinNote(note)"
      />
      <font-awesome-icon
        v-else
        :icon="['fas', 'fa-star']"
        class="nav-notes__icon nav-notes__icon--pinned"
        @click="togglePinNote(note)"
      />
      <font-awesome-icon
        :icon="['far', 'trash-alt']"
        class="nav-notes__icon nav-notes__icon--remove"
        @click="deleteNote(note.id)"
      />
    </li>
  </ul>
  <p v-else class="nav-notes__message">
    There are no {{ !pinnedType ? "" : "pinned" }} notes
  </p>
</template>
<script>
export default {
  name: "NotesListComponent",
  props: {
    pinnedType: {
      required: true,
      default: false,
    },
    notes: {
      required: true,
      type: Array,
    },
  },
  emits: ["togglePinNote", "deleteNote"],
  methods: {
    togglePinNote(pinnedNote) {
      this.$emit("togglePinNote", pinnedNote);
    },
    deleteNote(id) {
      this.$emit("deleteNote", id);
    },
  },
};
</script>
