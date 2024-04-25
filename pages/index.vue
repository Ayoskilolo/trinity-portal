<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Welcome {{ data?.user?.userName }}</h1>
    <p>Access your dashboard and account from here</p>

    <button
      type="button"
      class="bg-red-500 hover:bg-red-600 transition-all duration-200 text-red-50 rounded-lg py-2 px-5 mt-4"
      @click="logoutFromPortal"
    >
      Logout
    </button>
  </div>
</template>

<style></style>

<script setup lang="ts">
const { data, signOut } = useAuth();

definePageMeta({
  middleware: "auth",
});

async function logoutFromPortal() {
  await signOut();
}
</script>
