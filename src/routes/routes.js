import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";

import NotFound from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    meta: { requireAuth: true },
    children: [
      {
        path: "/",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "[request]" */ "../views/Dashboard.vue"),
        meta: { requireAuth: true }
      },
      {
        path: "/dashboard",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "[request]" */ "../views/Dashboard.vue"),
        meta: { requireAuth: true }
      },
      {
        path: "/icons",
        name: "icons",
        component: () =>
          import(/* webpackChunkName: "[request]" */ "../views/Icons.vue"),
        meta: { requireAuth: true }
      },
      {
        path: "/profile",
        name: "profile",
        component: () =>
          import(
            /* webpackChunkName: "[request]" */ "../views/Pages/UserProfile.vue"
          ),
        meta: { requireAuth: true }
      },
      {
        path: "/maps",
        name: "maps",
        component: () =>
          import(/* webpackChunkName: "[request]" */ "../views/GoogleMaps.vue"),
        meta: { requireAuth: true }
      },
      {
        path: "/tables",
        name: "tables",
        component: () =>
          import(
            /* webpackChunkName: "[request]" */ "../views/RegularTables.vue"
          ),
        meta: { requireAuth: true }
      },
      {
        path: "/account/:id",
        name: "Account",
        component: () =>
          import(/* webpackChunkName: "[request]" */ "../views/Account"),
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue")
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Register.vue")
      },
      {
        path: "/verify",
        name: "verify",
        component: () =>
          import(
            /* webpackChunkName: "[request]" */ "../views/Pages/Verify.vue"
          )
      },
      {
        path: "/verify/:token",
        name: "verify",
        component: () =>
          import(
            /* webpackChunkName: "[request]" */ "../views/Pages/Verify.vue"
          )
      },
      { path: "*", component: NotFound }
    ]
  }
];

export default routes;
