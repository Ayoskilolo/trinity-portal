<template>
  <section v-if="!loading" class="p-2">
    <div class="w-full flex justify-center mb-8">
      <p class="text-h5">
        Consulation Booked for the
        {{ format(visitInformation.dateOfVisit, "PPPP") }}
      </p>
    </div>

    <section class="flex justify-center">
      <q-card class="q-pa-md" style="border-radius: 10px; width: 80%">
        Student Assigned:
        <q-card-section
          style="background-color: lightgray; border-radius: 10px"
        >
          <p>
            Name:
            <q-chip color="blue-11">
              {{
                `${visitInformation.Student.firstName} ${visitInformation.Student.lastName} `
              }}</q-chip
            >
          </p>

          <p>
            Sex:
            <q-chip color="blue-11">{{ visitInformation.Student.sex }}</q-chip>
          </p>
          <p>
            Date Of Birth :
            <q-chip color="blue-11">{{
              visitInformation.Student.dateOfBirth
            }}</q-chip>
          </p>
          <p>
            Hall:
            <q-chip color="blue-11">{{ visitInformation.Student.hall }}</q-chip>
          </p>
        </q-card-section>
        <br />
        <p>Student's Complaints:</p>
        <q-card-section
          style="background-color: lightgray; border-radius: 10px"
        >
          {{ visitInformation.notes }}
        </q-card-section>
        <br />
        <p>Select Diagnosis</p>
        <q-card-section
          style="background-color: lightgray; border-radius: 10px"
        >
          <q-select
            outlined
            hide-selected
            style="color: black"
            color="lightblue"
            v-model="diagnosis"
            :options="issues"
            label="Select Diagnosis"
            id="select"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" style="color: black">
                <q-item-section>
                  <q-item-label>{{ scope.opt }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
        <br />
        <p>Your Comments:</p>
        <q-card-section
          style="background-color: lightgray; border-radius: 10px"
        >
          <q-input
            v-model="doctorsNotes"
            filled
            type="textarea"
            style="width: 100%"
          ></q-input>
        </q-card-section>

        <q-card-section style="width: 100%">
          <q-btn
            style="width: 100%; background-color: lightblue"
            label="Finish Consultation"
            @click="concludeVisit()"
          ></q-btn>
        </q-card-section>
      </q-card>
    </section>

    <q-dialog v-model="successModal">
      <SuccessModal @close-modal="closeModal('success')" :reason="feedback" />
    </q-dialog>
    <q-dialog v-model="failureModal">
      <FailureModal @close-modal="closeModal('failure')" :reason="feedback" />
    </q-dialog>
  </section>

  <q-inner-loading showing color="blue" v-else />
</template>

<script setup lang="ts">
import { format } from "date-fns";
const loading = ref(true);

const id = String(useRoute().params.id);
const issues = ["COLD", "MALARIA", "SPRAIN", "NULL"];
const visitInformation = ref();
const doctorsNotes = ref();
const diagnosis = ref();
const feedback = ref("");
const successModal = ref(false);
const failureModal = ref(false);

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

async function concludeVisit() {
  loading.value = true;
  Loading.show({
    delay: 200,
    message: "Concluding Consultation for the Student",
  });

  let response: Visit;

  try {
    response = await $fetch("/api/visit/visit", {
      method: "PATCH",
      body: {
        id,
        doctorsNotes: doctorsNotes.value,
        diagnosis: diagnosis.value,
        status: "COMPLETED",
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (response) {
      feedback.value = "The consultation has been completed!";
      successModal.value = true;
    } else {
      feedback.value = "Something went wrong in registering your consultation.";
      failureModal.value = true;
    }
    loading.value = false;
    Loading.hide();
  }
}

function closeModal(type: string) {
  switch (type) {
    case "success":
      useRouter().push("/consultation");
    case "failure":
      failureModal.value = false;
  }
}
</script>
