<template>
  <div class="container">
    <p>Current Date: {{ currentDate }}</p>
    <!-- <font-awesome-icon
          :icon="['fas', 'fa-filter']"
          class="icon-filter"
        /> -->
    <nav class="nav-notes">
      <notes-list-component
        :pinnedType="true"
        :notes="pinnedNotes"
        @togglePinNote="togglePinNote"
        @deleteNote="deleteNote"
      />
      <notes-list-component
        :pinnedType="false"
        :notes="notes"
        @togglePinNote="togglePinNote"
        @deleteNote="deleteNote"
      />

      <router-link :to="{ name: 'createNote' }" class="nav-notes__create-link"
        >Create
      </router-link>
    </nav>
  </div>
</template>

<script>
import NotesListComponent from "@/components/NotesListComponent.vue";
import { mapGetters } from "vuex";

export default {
  components: { NotesListComponent },
  name: "NotesListView",
  computed: {
    ...mapGetters({
      notes: "getNotesList",
    }),
    pinnedNotes() {
      return this.notes.filter((note) => note.pinned);
    },
    currentDate() {
      return this.$formatDate(new Date());
    },
  },

  methods: {
    deleteNote(id) {
      this.$store.commit("deleteNote", id);
    },
    togglePinNote(note) {
      const updatedNote = { ...note };
      updatedNote.pinned = !updatedNote.pinned;
      this.$store.commit("updateNote", updatedNote);
    },
  },
};
</script>
