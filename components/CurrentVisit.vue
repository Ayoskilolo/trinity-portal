<template>
  <section class="p-10" v-if="visitInformation">
    <div class="w-full flex justify-between items-center">
      <q-btn icon="close" round flat @click="closeModal" />
      <p>
        Visit Information on the
        {{ format(props.visitInformation.dateOfVisit, "PPPP") }}
      </p>

      <q-btn
        flat
        round
        icon="print"
        style="color: lightblue"
        @click="printPage()"
      />
    </div>

    <q-card class="mt-20">
      <q-card-section>
        Doctor Assigned:
        {{
          `${props.visitInformation.Doctor.firstName} ${props.visitInformation.Doctor.lastName} `
        }}

        <q-card-section>
          Doctor's Notes
          <br />
          {{ props.visitInformation.doctorsNotes }}
        </q-card-section>
      </q-card-section>

      <q-card-section>
        Status of Visit:
        <br />
        <q-chip> {{ props.visitInformation.status }}</q-chip>
      </q-card-section>

      <q-card-section>
        Diagnosis
        <br />
        <q-chip> {{ props.visitInformation.diagnosis }} </q-chip>
      </q-card-section>

      <q-card-section>
        Severity
        <br />
        <q-chip> {{ props.visitInformation.severity }}</q-chip>
      </q-card-section>

      <q-card-section>
        Initial Notes
        <br />
        {{ props.visitInformation.notes }}
      </q-card-section>
    </q-card>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeModal"]);

import { format } from "date-fns";

const props = defineProps({
  visitInformation: Object,
});

function printPage() {
  if (process.browser) {
    window.print();
  }
}

function closeModal() {
  emit("closeModal");
}
</script>
