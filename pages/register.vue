<script lang="ts" setup>
import type { _opacity } from "#tailwind-config/theme";
import FailureModal from "~/components/FailureModal.vue";
import SuccessModal from "~/components/SuccessModal.vue";

definePageMeta({
  middleware: "guest",
  layout: "auth",
});

const isLoading = ref(false);
const form = ref({
  email: "",
  matricNumber: "",
  nationality: "",
  dateOfBirth: ",",
  level: "",
  college: "",
  sex: "",
  hall: "",
  religion: "",
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  role: "",
});

const roles = ["doctor", "student", "nurse"];
const level = ["ALEVEL", "FRESHMAN", "SOPHMORE", "JUNIOR", "SENIOR"];
const college = ["FBMAS", "FMASS", "COE"];
const sex = ["MALE", "FEMALE"];
const hall = ["Deborah", "Esther", "Mary", "Joseph", "Daniel"];

const successModal = ref(false);
const failureModal = ref(false);

async function registerUser() {
  try {
    Loading.show({
      message: "Registering the new user",
    });
    isLoading.value = true;
    const response = await $fetch("api/auth/register", {
      method: "POST",
      body: form.value,
    });

    if (response) {
      successModal.value = true;
    }
  } catch (error) {
    failureModal.value = true;
    console.log(error);
  } finally {
    Loading.hide();
    isLoading.value = false;
  }
}

function closeModal(type: string) {
  switch (type) {
    case "success":
      useRouter().push("/auth");
    case "failure":
      failureModal.value = false;
  }
}
</script>
<template>
  <div class="p-5 place-items-center">
    <h1 class="mb-4 text-xl font-bold">Register for the Trinity Portal</h1>
    <form @submit.prevent="registerUser">
      <USelect
        v-model="form.role"
        :options="roles"
        variant="none"
        placeholder="Role"
        class="w-full border p-2 rounded-lg mb-4 bg-black text-white"
      />

      <!-- username -->
      <input
        v-model="form.userName"
        class="w-full border p-2 rounded-lg mb-4"
        type="text"
        name="username"
        v-if="form.role === 'nurse'"
        placeholder="Username"
      />

      <!-- password -->
      <input
        v-model="form.password"
        class="w-full border p-2 rounded-lg mb-4"
        type="password"
        placeholder="Password"
      />

      <!-- email -->
      <input
        v-model="form.email"
        class="w-full border p-2 rounded-lg mb-4"
        type="email"
        name="email"
        placeholder="Email"
        v-if="form.role != 'student'"
      />

      <!-- firstname -->
      <input
        v-model="form.firstName"
        class="w-full border p-2 rounded-lg mb-4"
        type="text"
        name="firstName"
        placeholder="First Name"
        v-if="form.role === 'doctor' || form.role === 'student'"
      />

      <!-- lastname -->
      <input
        v-model="form.lastName"
        class="w-full border p-2 rounded-lg mb-4"
        type="text"
        name="lastName"
        placeholder="Last Name"
        v-if="form.role === 'doctor' || form.role === 'student'"
      />

      <!-- matric number -->
      <input
        v-model="form.matricNumber"
        class="w-full border p-2 rounded-lg mb-4"
        type="text"
        name="matricNumber"
        v-if="form.role === 'student'"
        placeholder="matric number"
      />

      <!-- nationality -->
      <input
        v-model="form.nationality"
        class="w-full border p-2 rounded-lg mb-4"
        type="text"
        name="nationality"
        v-if="form.role === 'student'"
        placeholder="nationality"
      />

      <!-- date of birth -->
      <input
        v-model="form.dateOfBirth"
        type="date"
        name="dateOfBirth"
        class="w-full border p-2 rounded-lg mb-4"
        v-if="form.role === 'student'"
        placeholder="date of birth"
      />

      <!-- level -->
      <USelect
        v-model="form.level"
        :options="level"
        variant="none"
        class="w-full border p-2 rounded-lg mb-4 bg-black text-white"
        v-if="form.role === 'student'"
        placeholder="level"
      />

      <!-- college -->
      <USelect
        v-model="form.college"
        :options="college"
        variant="none"
        class="w-full border p-2 rounded-lg mb-4 bg-black text-white"
        v-if="form.role === 'student'"
        placeholder="college"
      />

      <!-- sex -->
      <USelect
        v-model="form.sex"
        :options="sex"
        variant="none"
        class="w-full border p-2 rounded-lg mb-4 bg-black text-white"
        v-if="form.role === 'student'"
        placeholder="sex"
      />

      <!-- hall -->
      <USelect
        v-model="form.hall"
        :options="hall"
        variant="none"
        class="w-full border p-2 rounded-lg mb-4 bg-black text-white"
        v-if="form.role === 'student'"
        placeholder="hall"
      />

      <!-- religion -->
      <input
        v-model="form.religion"
        class="w-full border p-2 rounded-lg mb-4"
        type="text"
        name="username"
        v-if="form.role === 'student'"
        placeholder="religion"
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
  <q-dialog v-model="successModal">
    <SuccessModal
      @close-modal="closeModal('success')"
      reason="You have successfully registered the user."
    />
  </q-dialog>
  <q-dialog v-model="failureModal">
    <FailureModal
      @close-modal="closeModal('failure')"
      reason="Something went wrong in registering the user"
    />
  </q-dialog>
</template>

<style></style>
