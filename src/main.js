import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/main.scss";
import { formatDate } from "@/utils/utils.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrashAlt, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fasStar,
  faPen as fasPen,
  faFilter as fasFilter,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(faTrashAlt, faStar, fasStar, fasFilter, fasPen, faChevronLeft);

const app = createApp(App);
app.config.globalProperties.$formatDate = formatDate;

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(store).use(router);

app.mount("#app");
