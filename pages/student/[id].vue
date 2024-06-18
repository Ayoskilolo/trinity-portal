<template>
  <section class="top-profile">
    <q-btn
      flat
      filled
      to="/student"
      icon="arrow_back_ios"
      color="black items-center"
      class="bg-cyan-100"
      style="width: 2%; border-radius: 4px"
    />
    <div class="row items-center" v-if="!isScreenSizeSmall">
      <q-skeleton type="QAvatar" :size="avatarSize" v-if="loading" />
      <q-avatar :size="avatarSize" v-else-if="!isScreenSizeSmall">
        <q-img src="/user.png" />
      </q-avatar>
    </div>

    <div class="row items-center grid-card">
      <q-card flat v-if="loading" style="padding: 5px">
        <div class="row">
          <q-skeleton
            type="QAvatar"
            :size="avatarSize"
            class="q-mr-sm"
            v-if="isScreenSizeSmall"
          />
          <q-skeleton type="text" height="30px" width="200px" />
        </div>
        <br />
        <div
          class="row justify-around"
          style="width: 100%; gap: 1em; padding: 0"
        >
          <q-skeleton type="rect" height="80px" class="col-5 info-card" />
          <q-skeleton type="rect" height="80px" class="col-5 info-card" />
        </div>
      </q-card>

      <q-card flat class="col-12" v-else>
        <q-card-section class="row">
          <q-avatar :size="avatarSize" v-if="isScreenSizeSmall" class="q-mr-md">
            <q-img src="/user.png" />
          </q-avatar>
          <span class="text-body1">
            {{ currentStudent.firstName }} {{ currentStudent.lastName }}
          </span>
          <q-btn
            flat
            no-caps
            outline
            label="Alert Guardian"
            class="bg-cyan-100 text-black q-mt-sm"
            style="width: 100%"
          />
          <q-btn
            flat
            no-caps
            outline
            label="Book Visit"
            class="bg-cyan-100 text-black q-mt-sm"
            style="width: 100%"
            @click="togglenewVisit()"
          />
        </q-card-section>

        <!-- <q-card-section v-if="activeLoan">
          <p>No Active Loan</p>
        </q-card-section>
        <div v-else>
          <q-card-section horizontal>
            <q-card-section
              class="q-mr-sm"
              style="border: 1px solid #f8f3e9; border-radius: 10px"
            >
              <span class="text-body2">Loan Balance:</span>
              <br />
              <span class="text-h6 ellipsis"> ₦0</span>
            </q-card-section>

            <q-card-section
              class="q-pr-sm"
              style="border: 1px solid #f8f3e9; border-radius: 10px"
            >
              <span class="text-body2">Total Amount Collected:</span>
              <br />
              <span class="text-h6 ellipsis"> ₦0</span>
            </q-card-section>
          </q-card-section>

        </div> -->
      </q-card>
    </div>
  </section>

  <section>
    <q-tabs
      v-model="tab"
      dense
      class="text-black"
      active-color="bg-cyan-100"
      indicator-color="bg-cyan-100"
      align="left"
      narrow-indicator
      no-caps
      style="height: 5vh"
    >
      <q-tab name="visits" label="Visits" />
      <q-tab name="nextOfKin" label="Next Of Kin" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="visits">
        <q-table
          flat
          :bordered="turnTableToGrid"
          title="Visits List"
          :rows="currentStudentVisits"
          :loading="loading"
          :grid="turnTableToGrid"
          card-class="text-black"
          row-key="id"
          virtual-scroll
          style="height: 60vh"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="bg-cyan-100" />
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel name="nextOfKin">
        <div v-if="loading" style="height: 65vh">
          <q-skeleton class="q-mb-md" height="200px" v-for="n in 3" :key="n" />
        </div>
        <div v-else>
          <q-card flat bordered class="info-card">
            <q-card-section style="margin: 0">
              <span class="text-body1">Next of Kin Information</span>
            </q-card-section>
            <q-separator />
            <div class="row q-pa-sm">
              <q-card-section class="col-6 col-md-6 col-sm-7 col-xs-12">
                <p>
                  <span class="text-caption">Next Of Kin Name:</span>
                  <br />
                  <span class="text-subtitle1">
                    {{
                      `${currentStudent.NextOfKin.firstName} ${currentStudent.NextOfKin.lastName}`
                    }}
                  </span>
                </p>

                <p>
                  <span class="text-caption">Phone Number:</span>
                  <br />
                  <span class="text-subtitle1">
                    {{ currentStudent.NextOfKin.phoneNumber }}
                  </span>
                </p>
                <p>
                  <span class="text-caption">Home Address:</span>
                  <br />
                  <span class="text-subtitle1">
                    {{ currentStudent.NextOfKin.address }}
                  </span>
                </p>
              </q-card-section>
              <q-card-section class="col-6 col-md-6 col-sm-5 col-xs-12">
                <p>
                  <span class="text-caption">Spouse Name:</span>
                  <br />
                  <span class="text-subtitle1">{{}}</span>
                </p>
                <p>
                  <span class="text-caption">Spouse Phone Number:</span>
                  <br />
                  <span class="text-subtitle1">{{}}</span>
                </p>
              </q-card-section>
            </div>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </section>

  <q-dialog v-model="newVisitModal">
    <NewVisitModal />
  </q-dialog>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const loading = ref(true);
const currentStudent = ref({});
const currentStudentVisits = ref([]);
const currentStudentNextOfKinDetails = ref({});

const tab = ref("visits");

const newVisitModal = ref(false);

async function getAStudent(matricNumber) {
  loading.value = true;
  try {
    return await $fetch(
      "/api/student?" +
        new URLSearchParams({
          matricNumber,
        })
    );
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    loading.value = false;
  }
}

const studentMatricNo = useRoute().params.id;
const activeLoan = ref(true);

const $q = useQuasar();

onMounted(async () => {
  currentStudent.value = await getAStudent(studentMatricNo);
  currentStudentVisits.value = currentStudent.value.Visits;
  currentStudentNextOfKinDetails.value = currentStudent.value.NextOfKin;
  loading.value = false;
});

function togglenewVisit() {
  newVisitModal.value = !newVisitModal.value;
}

const isScreenSizeSmall = computed(() => {
  return $q.screen.lt.sm ? true : false;
});

const turnTableToGrid = computed(() => {
  return $q.screen.lt.sm ? true : $q.screen.lt.md ? true : false;
});

const avatarSize = computed(() => {
  return isScreenSizeSmall.value ? "30px" : "100px";
});
</script>

<style scoped>
.top-profile {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-content: center;
  border: 1px solid #f8f3e9;
  height: max-content;
  gap: 10px;
}

.tab-panel {
  padding: 2%;
}

.info-card {
  border-radius: 10px;
}

.grid-card {
  border: 1px solid #f8f3e9;
  border-radius: 10px;
  padding: 1em;
}
</style>
