import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import History from "../views/History.vue";
import ListDetails from "../views/ListDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/history",
    component: History,
  },
  {
    path: "/stats",
    component: History,
  },
  {
    path: "/settings",
    component: History,
  },
  {
    props: true,
    path: "/list/:id",
    component: ListDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
