<template>
  <section v-if="!loading" class="p-2">
    <div class="w-full flex justify-between">
      <p>
        Visit Information on the
        {{ format(visitInformation.dateOfVisit, "PPPP") }}
      </p>

      <q-btn flat round icon="print" style="color: lightblue" />
    </div>

    <q-card>
      Doctor Assigned:
      {{
        `${visitInformation.Doctor.firstName} ${visitInformation.Doctor.lastName} `
      }}
    </q-card>

    <pre>
        {{ visitInformation }}
    </pre>
  </section>
</template>

<script setup lang="ts">
import { format } from "date-fns";
const loading = ref(true);

const id = String(useRoute().params.id);
const visitInformation = ref();

onMounted(async () => {
  visitInformation.value = await getAVisit(id);
});

async function getAVisit(id: string) {
  loading.value = true;
  try {
    return await $fetch(
      "/api/visit/visit?" +
        new URLSearchParams({
          visitId: id,
        })
    );
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    loading.value = false;
  }
}
</script>
