import { createRouter, createWebHistory } from "vue-router";

import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Score from "../components/Score.vue";
import Tracking from "../components/Tracking.vue";
import Profile from "../components/Profile.vue";
import Calculation from "../components/Calculation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/score",
      name: "Score",
      component: Score,
      meta: { requiresAuth: true },
    },
    {
      path: "/tracking",
      name: "Tracking",
      component: Tracking,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: "/calculation",
      name: "Calculation",
      component: Calculation,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loginTime = localStorage.getItem("loginTime");
  const sessionExpired = localStorage.getItem("sessionExpired");

  if (sessionExpired) {
    return next({ name: "Login" });
  }

  if (loginTime && to.meta.requiresAuth) {
    next();
  } else if (!loginTime && to.meta.requiresAuth) {
    return next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
