import { createRouter, createWebHistory } from "vue-router";
import { AboutView, HomeView, LoginView, NotFoundView } from "../views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: {
        name: "login",
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        layout: "login",
      },
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: {
        layout: "default",
        requiresAuth: true,
      },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: {
        layout: "default",
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFoundView,
      meta: {
        layout: "empty",
      },
    },
  ],
});

export const useAuth = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return { user: user, token: token };
};

router.beforeEach((to, from, next) => {
  const { user, token } = useAuth();
  if (to.meta.requiresAuth && (!user || !token)) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return next({ name: "login" });
  } else if ((to.name == "login" || to.name == "register") && user && token) {
    return next({ name: "home" });
  } else {
    return next();
  }
});

export default router;
