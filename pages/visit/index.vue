<template>
  <q-layout>
    <section class="q-pa-md">
      <section class="row justify-around items-center q-pb-lg">
        <q-card
          flat
          bordered
          class="dash-card col-md-3 col-sm-3 col-xs-12 q-mb-md"
        >
          <q-card-section class="items-center">
            <p class="text-body2 ellipsis-2-lines">NO OF VISITS TODAY</p>
            <p class="text-h3">{{ visits.length }}</p>
          </q-card-section>
        </q-card>
        <q-card
          flat
          bordered
          class="dash-card col-md-3 col-sm-3 col-xs-12 q-mb-md offset-md-1"
        >
          <q-card-section>
            <p class="text-body2">NO OF ACTIVE DOCTORS</p>
            <p class="text-h3">1</p>
          </q-card-section>
        </q-card>
      </section>
      <section>
        <q-table
          flat
          :bordered="isScreenSizeSmall"
          table-header-style="background-color: lightblue"
          title="Visit History"
          :rows="visits"
          :columns="collectionColumns"
          :filter="filter"
          :loading="loading"
          :grid="isScreenSizeSmall"
          row-key="index"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[rowsPerPageOptions]"
          style="max-height: 30vh"
          no-data-label="There are no visits as of today!"
          no-results-label="Couldn't find that student/visit. Check the student/doctor name?"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="amber" />
          </template>
          <template v-slot:top-right>
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
              color="grey"
              class="q-pr-sm"
              style="width: 100%"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <br />
          </template>
          <template v-slot:no-data="{ message, filter }">
            <div
              class="full-width full-height row flex-center text-black q-gutter-sm"
              style="height: 50vh; text-align: center"
            >
              <span> {{ message }} </span>
              <q-icon
                size="2em"
                :name="filter ? 'error' : 'published_with_changes'"
              />
            </div>
          </template>

          <template v-slot:body-cell="props">
            <!-- <q-td
              :props="props"
              @click="useRouter().push(`/visit/${props.row.id}`)"
              style="cursor: pointer"
              align="center"
            >
              <q-tr :props="props">{{ props.value }}</q-tr>
            </q-td> -->

            <q-td
              :props="props"
              @click="openDrawer(props.row.id)"
              style="cursor: pointer"
              align="center"
            >
              <q-tr :props="props">{{ props.value }}</q-tr>
            </q-td>
          </template>
        </q-table>
      </section>
    </section>

    <q-drawer
      v-model="drawer"
      :width="700"
      :breakpoint="500"
      overlay
      bordered
      side="right"
    >
      <CurrentVisit
        :visitInformation="visitInformation"
        @close-modal="drawer = !drawer"
      />
    </q-drawer>
  </q-layout>
</template>

<script setup>
import { format } from "date-fns";
const $q = useQuasar();

const drawer = ref(false);
const isScreenSizeSmall = computed(() => {
  return $q.screen.lt.sm ? true : false;
});

const rowsPerPageOptions = computed(() => {
  return $q.screen.gt.xs ? ($q.screen.gt.sm ? [4, 6, 9] : [4, 6]) : [4];
});

function getItemsPerPage() {
  if ($q.screen.lt.sm) {
    return 4;
  }
  if ($q.screen.lt.md) {
    return 20;
  }
  return 40;
}

definePageMeta({
  middleware: "auth",
});

const visits = ref([]);
const collectionColumns = [
  // {
  //   name: "Student",
  //   required: true,
  //   label: "Student Name",
  //   align: "left",
  //   field: "Student",
  //   format: (val) => `${val.firstName} ${val.lastName}`,
  // },
  {
    name: "Doctor",
    label: "Doctor Name",
    field: "Doctor",
    align: "left",
    format: (val) => `${val.firstName} ${val.lastName}`,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
  },
  {
    name: "diagnosis",
    label: "Diagnosis",
    field: "diagnosis",
    align: "left",
  },
  {
    name: "severity",
    label: "Severity",
    field: "severity",
    align: "left",
  },
  {
    name: "dateOfVisit",
    label: "Date of Visit",
    field: "dateOfVisit",
    align: "left",
    format: (val) => `${format(new Date(val), "do MMM yyy")}`,
  },
  //   {
  //     name: "dateOfCompletion",
  //     label: "Date of Completion",
  //     field: "dateOfCompletion",
  //     align: "left",
  //     format: (val) => `${format(new Date(val), "do MMM yyy")}`,
  //   },
];

//Display Helper Variables
const loading = ref(true);
const filter = ref("");
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
});

const { data } = useAuth();

const user = data.value.user;

onMounted(async () => {
  switch (user.role) {
    case "student":
      visits.value = await $fetch(
        "/api/visit/visit?" +
          new URLSearchParams({
            matricNumber: user.matricNumber,
          })
      );

      break;

    case "nurse":
      visits.value = await $fetch(
        "/api/visit/visit?" +
          new URLSearchParams({
            id: user.id,
          })
      );
      //   collectionColumns.push({
      //     name: "Student",
      //     required: true,
      //     label: "Student Name",
      //     align: "left",
      //     field: "Student",
      //     format: (val) => `${val.firstName} ${val.lastName}`,
      //   });
      break;
  }

  if (!visits.value) visits.value = [];
  loading.value = false;
});

const visitInformation = ref();

async function openDrawer(id) {
  visitInformation.value = await getAVisit(id);
  drawer.value = !drawer.value;
}

async function getAVisit(id) {
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

<style scoped>
.dash-card {
  height: 18vh;
  align-content: center;
  gap: 10px;
}

.table-tint {
  background-color: #f8f3e9;
}
</style>

<script setup></script>
