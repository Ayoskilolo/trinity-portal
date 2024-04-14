import { Loading } from "quasar";

export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  if (status.value === "authenticated") {
    return navigateTo("/student");
  } else return navigateTo("/auth");
});
