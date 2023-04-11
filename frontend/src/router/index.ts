// Import Core
import { createRouter, createWebHistory } from "vue-router";
// Pinia
import { useStoreAuth } from "@/stores/storeAuth";

// Data
const siteTitle = "Demetory 4 Enter VR";

// Routes
const routes = [
  {
    path: "/",
    name: "PageHome",
    // Can be simple redirected to PagePlans if needed
    component: () => import("@/views/ViewHome.vue"),
  },
  {
    path: "/plans/:id(\\d+)?",
    name: "PagePlans",
    component: () => import("@/views/ViewPlans.vue"),
    meta: {
      title: "Our cool plans",
    },
  },
  {
    path: "/login",
    name: "PageLogin",
    component: () => import("@/views/ViewLogin.vue"),
    meta: {
      title: "Login",
    },
  },

  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: () => import("@/views/ViewNotFound.vue"),
    meta: {
      title: "Page not Found",
    },
  },
];

// Create Router
const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      return { top: 0 };
    }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guards
router.beforeEach((to) => {
  const storeAuth = useStoreAuth();

  if (!storeAuth.user.role && to.name !== "PageLogin") {
    return { name: "PageLogin" };
  }
  if (storeAuth.user.role && to.name === "PageLogin") {
    return { name: "PageHome" };
  }
});

router.afterEach((to) => {
  document.title = typeof to.meta.title === "string" ? siteTitle + " | " + to.meta.title : siteTitle;
});

// Export
export default router;
