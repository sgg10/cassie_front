import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes, // short for routes: routes
  linkActiveClass: "active",
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.afterEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requireAuth)) {
    if (
      !store.state.auth.user ||
      !window.localStorage.getItem("refresh_token")
    ) {
      window.location.pathname = "/login";
    }
  }
});

export default router;
