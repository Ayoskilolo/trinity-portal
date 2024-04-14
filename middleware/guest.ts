import { Loading } from "quasar";

export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  if (status.value === "authenticated") {
    Loading.show({
      message: "Oops seems like you need to login",
    });

    navigateTo("/student");

    Loading.hide();

    return;
  }
});
