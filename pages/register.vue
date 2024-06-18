<script lang="ts" setup>
import type { _opacity } from "#tailwind-config/theme";

definePageMeta({
  middleware: "guest",
  layout: "auth",
});

const isLoading = ref(false);
const form = ref({ email: "", userName: "", password: "" });

async function registerUser() {
  try {
    isLoading.value = true;
    await $fetch("api/auth/register", {
      method: "POST",
      body: form.value,
    });

    useRouter().push("/auth");
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div class="p-5 place-items-center">
    <h1 class="mb-4 text-xl font-bold">Register</h1>
    <form @submit.prevent="registerUser">
      <input
        v-model="form.email"
        class="w-full border p-2 rounded-lg mb-4"
        type="email"
        name="email"
        placeholder="Email"
      />
      <input
        v-model="form.userName"
        class="w-full border p-2 rounded-lg mb-4"
        type="text"
        name="username"
        placeholder="Username"
      />
      <input
        v-model="form.password"
        class="w-full border p-2 rounded-lg mb-4"
        type="password"
        placeholder="Password"
      />
      <button
        :disabled="isLoading"
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 transition-all duration-200 w-full text-blue-50 rounded-lg p-2"
        :class="{
          'opacity-50 cursor-not-allowed': isLoading,
        }"
      >
        Register
      </button>
    </form>
  </div>
</template>

<style></style>
