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
      <q-stepper
        v-model="step"
        header-nav
        ref="stepper"
        color="primary"
        keep-alive
        animated
        flat
        class="w-full bg-transparent"
      >
        <q-step
          :name="1"
          title="Select user type"
          icon="settings"
          :done="step > 1"
          :header-nav="step > 1"
          style="color: black"
          class="w-full col"
        >
          <div class="row flex justify-evenly items-center">
            <q-btn
              outline
              rounded
              no-caps
              color="primary"
              label="Student"
              class="mr-4"
              @click="setUserType('student')"
            />
            <q-btn
              outline
              rounded
              no-caps
              color="primary"
              label="Doctor"
              class="mr-4"
              @click="setUserType('doctor')"
            />
            <q-btn
              outline
              rounded
              no-caps
              color="primary"
              label="Nurse"
              @click="setUserType('nurse')"
            />
          </div>

          <div class="flex justify-center items-center mt-5">
            <p>Don't have an account?</p>
            <q-btn
              rounded
              flat
              no-caps
              color="primary"
              label="Register"
              to="/register"
            />
          </div>
        </q-step>

        <q-step
          :name="2"
          title="Sign In"
          icon="create_new_folder"
          :done="step > 2"
          :header-nav="step > 2"
        >
          <p class="text-2xl text-blue-500">Sign In</p>

          <QInput
            v-model="loginForm.email"
            class="w-full py-1"
            outlined
            rounded
            dense
            :placeholder="placeholder"
            icon="i-ph-envelope"
            v-if="loginForm.role != 'student'"
          />

          <QInput
            v-model="loginForm.matricNumber"
            class="w-full py-1"
            outlined
            rounded
            dense
            :placeholder="placeholder"
            icon="i-ph-envelope"
            v-if="loginForm.role === 'student'"
          />

          <QInput
            v-model="loginForm.password"
            class="w-full py-1 pb-2"
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
            label="Sign In"
            class="p-2 w-full flex items-center justify-center"
            color="blue"
            icon-right="login"
            :loading="loading"
            type="submit"
          />
          <div v-if="error" class="error w-1/2">
            <p>Incorrect Email or Password</p>
          </div>
        </q-step>
      </q-stepper>
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
  matricNumber: "",
  role: "",
});

const [error] = useAutoAnimate();
const hidden = ref(true);
const step = ref(1);
const placeholder = ref("");

const loading = ref(false);

const { signIn } = useAuth();

async function login() {
  try {
    loading.value = true;
    await signIn("credentials", loginForm.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    error.value = false;
  }
}

function setUserType(type) {
  loginForm.value.role = type;
  step.value += 1;
}

watch(loginForm, () => {
  switch (loginForm.value.role) {
    case "student":
      placeholder.value = "Enter your matric number and password";
    case "doctor":
      placeholder.value = "Enter your email and password";
    case "nurse":
      placeholder.value = "Enter your email/username and password";
  }
});
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
