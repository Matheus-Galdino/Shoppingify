import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import History from "../views/History.vue";
import ListDetails from "../views/ListDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
  {
    path: "/stats",
    name: "Stats",
    component: History,
  },
  {
    path: "/settings",
    name: "Settings",
    component: History,
  },
  {
    props: true,
    path: "/list/:id",
    name: "ListDetails",
    component: ListDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
