<template>
  <div class="note container">
    <div class="note__inner">
      <div class="note__toolbar">
        <router-link to="/">
          <font-awesome-icon
            :icon="['fas', 'fa-chevron-left']"
            class="note__icon-back"
          />
        </router-link>
        <div class="note__toolbar-inner">
          <font-awesome-icon
            v-if="!(editMode || createMode)"
            :icon="['fas', 'fa-pen']"
            class="note__icon note__icon--edit"
            @click="activeEditMode"
          />
          <font-awesome-icon
            v-if="!pinned"
            :icon="['far', 'fa-star']"
            class="note__icon note__icon--pinned"
            @click="togglePinNote()"
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'fa-star']"
            class="note__icon note__icon--pinned"
            @click="togglePinNote()"
          />

          <font-awesome-icon
            :icon="['far', 'trash-alt']"
            class="note__icon note__icon--remove"
            @click="deleteNote"
          />
        </div>
      </div>
      <div class="note__date-bar" v-if="!createMode">
        <span v-if="dateCreate"
          >Created: {{ this.$formatDate(dateCreate) }}</span
        >
        <span v-if="dateUpdate"
          >Last Update: {{ this.$formatDate(dateUpdate) }}</span
        >
      </div>
      <div class="note__category">
        <div
          v-for="(c, idx) in category"
          :key="idx + 'category'"
          :class="[
            'note__category-item',
            'note__category-item--' + idx,
            { active: c === true },
          ]"
          @click="toggleCategory(idx)"
        ></div>
      </div>
      <div v-if="createMode || editMode">
        <input
          type="text"
          v-model="title"
          maxlength="15"
          placeholder="Note Title"
          required
          class="note__input"
        />
        <textarea
          class="note__textarea"
          type="text"
          placeholder="Note Text"
          v-model="content"
          :disabled="!(createMode || editMode)"
        />
      </div>
      <div v-else>
        <p class="note__title">{{ title }}</p>
        <p>{{ content }}</p>
      </div>

      <button class="note__button" v-if="editMode" @click="saveNote">
        Save
      </button>
      <button
        class="note__button"
        v-if="createMode"
        @click="createNote"
        :disabled="!this.title"
      >
        Create Note
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteComponent",
  props: {
    createMode: {
      required: true,
      default: false,
    },
  },
  data() {
    return {
      editMode: false,
      id: null,
      title: "",
      content: "",
      pinned: false,
      dateCreate: null,
      dateUpdate: null,
      category: [false, false, false],
    };
  },
  computed: {
    note() {
      const id = Number(this.$route.params.id);
      return this.$store.getters["getNoteById"](id);
    },
  },
  mounted() {
    if (!this.createMode && this.note) {
      const { id, title, content, pinned, dateCreate, dateUpdate, category } =
        this.note;
      this.id = id;
      this.title = title;
      this.content = content;
      this.pinned = pinned;
      this.dateCreate = dateCreate;
      this.dateUpdate = dateUpdate;
      this.category = category;
    }
  },

  methods: {
    activeEditMode() {
      this.editMode = true;
    },
    toggleCategory(idx) {
      this.category[idx] = !this.category[idx];
      const updatedNote = { ...this.note };
      updatedNote.category = this.category;
      this.$store.commit("updateNote", updatedNote);
    },
    togglePinNote() {
      this.pinned = !this.pinned;
      if (!this.createMode) {
        this.updateNote();
      }
    },
    deleteNote() {
      if (!this.createMode) {
        this.$store.commit("deleteNote", this.id);
      }
      this.$router.push("/");
    },
    updateNote() {
      const payload = {
        id: this.id,
        title: this.title,
        content: this.content,
        pinned: this.pinned,
        dateCreate: this.dateCreate,
        category: this.category,
      };
      this.$store.commit("updateNote", payload);
    },
    saveNote() {
      if (!this.title) return;
      this.updateNote();
      this.editMode = false;
    },

    createNote() {
      if (!this.title) return;
      let payload = {
        title: this.title,
        content: this.content,
        pinned: this.pinned,
        category: this.category,
      };
      this.editMode = false;
      this.$store.commit("addNote", payload);
      this.$router.push("/");
    },
  },
};
</script>
