<template>
  <q-card class="text-black newVisitModal">
    <q-card-section style="text-align: center" class="text-h6">
      Book A Visit
    </q-card-section>
    <q-card-section style="padding: 0">
      <q-stepper
        v-model="step"
        header-nav
        ref="stepper"
        keep-alive
        animated
        active-color="cyan-9"
        inactive-color="grey"
      >
        <div style="text-align: center" class="text-h6">Visit Time</div>
        <q-step
          :name="1"
          title="Book Visit Time"
          icon="short_stay"
          :done="step > 1"
          :header-nav="step > 1"
        >
          <q-form @submit="confirmDateChosen()">
            <q-card-section style="padding: 0" class="row justify-around">
              <q-date
                v-model="visitInfo.datePicked"
                today-btn
                color="cyan-2"
                mask="YYYY-MM-DD HH:mm"
                text-color="black"
              />
              <q-time
                v-model="visitInfo.datePicked"
                mask="YYYY-MM-DD HH:mm"
                color="cyan-2"
                text-color="black"
              />
            </q-card-section>
            <q-badge
              color="blue-11"
              class="text-h5 my-3"
              v-if="visitInfo.datePicked"
            >
              Date Picked:
              {{ format(new Date(visitInfo.datePicked), "PPPPpp") }}
            </q-badge>

            <q-stepper-navigation class="row justify-between">
              <q-btn
                outline
                v-close-popup
                label="Cancel"
                id="closeNewUserModal"
                style="width: 48%; padding: 10px; color: lightblue"
              />
              <q-btn
                type="submit"
                style="
                  width: 48%;
                  padding: 10px;
                  background-color: lightblue;
                  color: black;
                "
                label="Continue"
              />
            </q-stepper-navigation>
          </q-form>
        </q-step>

        <q-step
          :name="2"
          title="Student's Complaints"
          caption="Optional"
          icon="pulse_alert"
          :done="step > 2"
          :header-nav="step > 2"
        >
          <q-form @submit="step = 3">
            <div class="text-weight-light q-mb-md">
              <p>Student's Complaints</p>
              <q-input v-model="visitInfo.notes" filled type="textarea">
              </q-input>
            </div>

            <q-stepper-navigation class="row justify-between">
              <q-btn
                outline
                @click="step = 1"
                label="Back"
                style="width: 48%; padding: 10px; color: lightblue"
              />
              <q-btn
                type="submit"
                style="
                  width: 48%;
                  padding: 10px;
                  background-color: lightblue;
                  color: black;
                "
                label="Continue"
              />
            </q-stepper-navigation>
          </q-form>
        </q-step>

        <q-step
          :name="3"
          title="Pick Doctor"
          icon="stethoscope"
          :header-nav="step > 3"
        >
          <q-form @submit="createVisit()">
            <!-- <div class="row">
              <q-card v-for="doctor in doctorsOnSeat">
                {{ doctor.firstName }}
              </q-card>
            </div> -->
            <q-select
              outlined
              hide-selected
              style="color: black"
              color="lightblue"
              v-model="visitInfo.doctorId"
              :options="doctorsOnSeat"
              :option-label="(obj: any) => `${obj.firstName} ${obj.lastName}`"
              option-value="id"
              label="Doctor's Name"
              map-options
              emit-value
              id="select"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" style="color: black">
                  <q-item-section>
                    <q-item-label
                      >{{ scope.opt.firstName }}
                      {{ scope.opt.lastName }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-stepper-navigation class="row justify-between">
              <q-btn
                outline
                @click="step = 2"
                label="Back"
                style="width: 48%; padding: 10px; color: lightblue"
              />
              <q-btn
                style="
                  width: 48%;
                  padding: 10px;
                  color: black;
                  background-color: lightblue;
                "
                :loading="loading"
                label="Book Visit"
                type="submit"
              />
            </q-stepper-navigation>
          </q-form>
        </q-step>
      </q-stepper>
    </q-card-section>
  </q-card>

  <q-dialog v-model="successModal">
    <SuccessModal @close-modal="closeModal('success')" :reason="feedback" />
  </q-dialog>
  <q-dialog v-model="failureModal">
    <FailureModal @close-modal="closeModal('failure')" :reason="feedback" />
  </q-dialog>
</template>

<script setup lang="ts">
import { format, isPast, parseISO } from "date-fns";
import { Notify } from "quasar";
import SuccessModal from "./SuccessModal.vue";
import type { Visit } from "~/server/models/visits";
import FailureModal from "./FailureModal.vue";

const step = ref(1);
const feedback = ref("");
const loading = ref(false);
const emit = defineEmits(["closeModal"]);
const successModal = ref(false);
const failureModal = ref(false);

const visitInfo = ref({
  datePicked: "",
  dateOfVisit: new Date(),
  notes: "",
  doctorId: "",
});
const studentId = String(useRoute().params.id);
const doctorsOnSeat = ref();

onMounted(async () => {
  doctorsOnSeat.value = await getDoctorsOnSeat();
});

async function getDoctorsOnSeat() {
  loading.value = true;
  try {
    return await $fetch(
      "/api/doctors?" +
        new URLSearchParams({
          status: "ON_SEAT",
        })
    );
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    loading.value = false;
  }
}

function confirmDateChosen() {
  if (isPast(visitInfo.value.datePicked)) {
    Notify.create({
      position: "top-right",
      message: "You can't pick a day/time in the past.",
      color: "negative",
    });
    return;
  }

  if (!visitInfo.value.datePicked) {
    Notify.create({
      position: "top-right",
      message: "You haven't picked a date.",
      color: "negative",
    });
    return;
  }

  step.value = 2;
}

async function createVisit() {
  loading.value = true;
  Loading.show({
    delay: 200,
    message: "Booking Visit for the student",
  });

  let response: Visit;

  try {
    visitInfo.value.dateOfVisit = new Date(visitInfo.value.datePicked);

    response = await $fetch("/api/visit/visit", {
      method: "POST",
      body: { ...visitInfo.value, studentId },
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (response) {
      feedback.value = "Your visit has been booked!";
      successModal.value = true;
    } else {
      feedback.value = "Something went wrong in booking your visit.";
      failureModal.value = true;
    }
    loading.value = false;
    Loading.hide();
  }
}

function closeModal(type: string) {
  switch (type) {
    case "success":
      emit("closeModal");
    case "failure":
      failureModal.value = false;
  }
}
</script>

<style scoped>
.newVisitModal {
  padding: 1em;
  width: 100%;
  max-width: 50vw;
}

#select {
  color: black;
  /* background-color: aqua; */
}
</style>
