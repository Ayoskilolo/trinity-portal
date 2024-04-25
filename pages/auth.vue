<template>
  <section
    class="flex h-screen border bg-gradient-to-r from-cyan-100 to-blue-300"
  >
    <div class="flex h-full w-1/2 items-center justify-center">
      <img src="/Trinity icon.png" />
    </div>
    <QForm
      class="flex flex-col h-full w-1/2 justify-center items-center"
      @submit="login()"
    >
      <p class="text-2xl text-blue-500">Sign In</p>

      <QInput
        v-model="loginForm.email"
        class="w-1/2 py-1"
        size="lg"
        outlined
        rounded
        dense
        placeholder="user@gmail.com"
        icon="i-ph-envelope"
      />

      <QInput
        v-model="loginForm.password"
        class="w-1/2 py-1 pb-2"
        size="lg"
        outlined
        dense
        rounded
        icon="i-ph-lock"
        :type="hidden ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="hidden ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="hidden = !hidden"
          />
        </template>
      </QInput>

      <QBtn
        rounded
        dense
        label="Login"
        class="p-2 w-1/2 flex items-center justify-center"
        color="blue"
        variant="soft"
        icon-right="login"
        :loading="loading"
        type="submit"
      />
      <div v-if="error" class="error w-1/2">
        <p>Incorrect Email or Password</p>
      </div>
    </QForm>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const loginForm = ref({
  email: "",
  password: "",
});

const [error] = useAutoAnimate();
const hidden = ref(true);

const loading = ref(false);

const { signIn } = useAuth();

async function login() {
  try {
    loading.value = true;
    await signIn("credentials", loginForm.value);
    useRouter().push("/student");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    error.value = false;
  }
}
</script>

<style scoped>
.error {
  background-color: crimson;
  color: white;
  margin-top: 15px;
  border-radius: 10px;
  text-align: center;
}
</style>
