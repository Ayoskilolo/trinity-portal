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
          <q-form @submit="step = 2">
            <q-card-section style="padding: 0" class="row justify-around">
              <q-date
                v-model="dateAssigned"
                today-btn
                color="cyan-2"
                mask="YYYY-MM-DD HH:mm"
                text-color="black"
              />
              <q-time
                v-model="dateAssigned"
                mask="YYYY-MM-DD HH:mm"
                color="cyan-2"
                text-color="black"
              />
            </q-card-section>
            <q-badge color="blue-11" class="text-h5 my-3" v-if="dateAssigned">
              Date Picked: {{ format(new Date(dateAssigned), "PPPPpp") }}
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
              <q-input v-model="text" filled type="textarea"> </q-input>
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
          <q-form @submit="createUser()">
            <q-select
              outlined
              v-model="doctorAssigned"
              :options="options"
              label="Outlined"
            >
              <template v-slot:append>
                <q-icon
                  v-if="text !== ''"
                  name="close"
                  @click="text = ''"
                  class="cursor-pointer"
                />
                <q-icon name="search" />
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
                label="Book Visit"
                type="submit"
              />
            </q-stepper-navigation>
          </q-form>
        </q-step>
      </q-stepper>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { format } from "date-fns";

const step = ref(1);
const doctorAssigned = ref("");
const dateAssigned = ref("");
const options = ref(["Semilore Sanya", "Afolabi Lesi"]);
</script>

<style scoped>
.newVisitModal {
  padding: 1em;
  width: 100%;
  max-width: 50vw;
}
</style>
