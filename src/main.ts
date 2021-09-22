import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueApexCharts from "vue3-apexcharts";

router.beforeEach((to, from, next) => {
  if (to.path !== "/auth" && to.path !== "/auth/login" && !store.getters.isAuthed) next("/auth");
  else if ((to.path === "/auth" || to.path === "/auth/login") && store.getters.isAuthed) next("/");
  else next();
});

createApp(App).use(store).use(router).use(VueApexCharts).mount("#app");
