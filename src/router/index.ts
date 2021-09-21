import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Stats from "../views/Stats.vue";
import Auth from "../views/Auth.vue";
import History from "../views/History.vue";
import ListDetails from "../views/ListDetails.vue";

import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    children: [
      { path: "", component: SignupForm },
      { path: "login", component: LoginForm },      
    ],
  },
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
    component: Stats,
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
