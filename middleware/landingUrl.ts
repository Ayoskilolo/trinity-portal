export default defineNuxtRouteMiddleware((to, from) => {
  const { status, data } = useAuth();

  if (status.value != "authenticated") {
    return navigateTo("/auth");
  } else {
    switch (data.user.role) {
      case "student":
        useRouter().push("/visit");
        break;
      case "doctor":
        useRouter().push("/consultation");
        break;
      case "nurse":
        useRouter().push("/student");
        break;
    }
  }
});
