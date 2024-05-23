import { createStore } from "vuex";

const store = createStore({
  state: {
    count: 1,
    notesList: [
      {
        id: 1,
        title: "My First Note",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, nobis nam. Alias nisi doloremque id.Alias nisi doloremque id.Alias nisi doloremque id.Alias nisi doloremque id.Alias nisi doloremque id.",
        pinned: true,
        dateCreate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        dateUpdate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        category: [false, false, false],
      },
      {
        id: 2,
        title: "Test Note",
        content: "Some text",
        pinned: true,
        dateCreate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        dateUpdate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        category: [true, true, false],
      },
      {
        id: 3,
        title: "test - 3",
        content: "345",
        pinned: false,
        dateCreate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        dateUpdate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        category: [false, true, false],
      },
      {
        id: 4,
        title: "test - 4",
        content: "345",
        pinned: false,
        dateCreate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        dateUpdate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        category: [false, true, false],
      },
      {
        id: 5,
        title: "test - 5",
        content: "345",
        pinned: false,
        dateCreate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        dateUpdate:
          "Wed May 22 2024 20:21:13 GMT+0200 (Central European Summer Time)",
        category: [false, true, false],
      },
    ],
  },
  getters: {
    getCount: (state) => state.count,
    getNotesList: (state) => state.notesList,
    getNoteById: (state) => (id) => {
      return state.notesList.find((note) => note.id === id);
    },
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("notes-app")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("notes-app")))
        );
      }
    },
    updateCount(state, val) {
      state.count = val;
    },
    addNote(state, note) {
      const newId = state.notesList.length
        ? Math.max(...state.notesList.map((note) => note.id)) + 1
        : 1;
      const dateCreate = new Date();
      const newNote = {
        ...note,
        id: newId,
        dateCreate: dateCreate,
        dateUpdate: dateCreate,
      };
      state.notesList.push(newNote);
    },

    updateNote(state, updatedNote) {
      const note = state.notesList.find((note) => note.id === updatedNote.id);
      if (note) {
        updatedNote.dateUpdate = new Date();
        Object.assign(note, updatedNote);
      }
    },
    deleteNote(state, id) {
      const index = state.notesList.findIndex((note) => note.id === id);
      if (index !== -1) {
        state.notesList.splice(index, 1);
      }
    },
  },
  actions: {},
  modules: {},
});

store.watch(
  (state) => state,
  (state) => {
    localStorage.setItem("notes-app", JSON.stringify(state));
  },
  { deep: true }
);
export default store;
