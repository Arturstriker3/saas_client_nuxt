import { storeToRefs } from "pinia";
import { useAuthStore } from "~/modules/auth/stores/auth.store";

const guestOnlyRouteNames = new Set([
  "public-home",
  "public-technologies",
  "auth-login",
  "auth-register",
  "auth-forgot-password",
]);

const isProtectedRoute = (name: string) =>
  name === "app" || name.startsWith("app-");

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  const routeName = typeof to.name === "string" ? to.name : "";
  if (guestOnlyRouteNames.has(routeName) && isAuthenticated.value) {
    return navigateTo({ name: "app" });
  }

  if (!isProtectedRoute(routeName)) {
    return;
  }

  if (!isAuthenticated.value) {
    return navigateTo({
      name: "auth-login",
      query: {
        redirect: routeName,
      },
    });
  }
});
