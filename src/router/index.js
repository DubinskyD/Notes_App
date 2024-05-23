import { createRouter, createWebHistory } from "vue-router";
import NotesListView from "@/views/NotesListView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NoteView from "@/views/NoteView.vue";

const routes = [
  {
    path: "/",
    name: "noteList",
    component: NotesListView,
  },
  {
    path: "/note/:id",
    name: "note",
    component: NoteView,
  },
  {
    path: "/note/create",
    name: "createNote",
    component: NoteView,
    meta: {
      mode: "create",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
