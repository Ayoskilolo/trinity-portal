<template>
  <section class="q-pa-md">
    <!-- <section class="row justify-around items-center q-pb-lg">
      <q-card
        flat
        bordered
        class="dash-card col-md-3 col-sm-3 col-xs-12 q-mb-md"
      >
        <q-card-section class="items-center">
          <p class="text-body2 ellipsis-2-lines">NO OF VISITS TODAY</p>
          <p class="text-h3">0</p>
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
    </section> -->

    <q-table
      flat
      :bordered="isScreenSizeSmall"
      table-header-style="background-color: lightblue"
      title="Consulation History"
      :rows="visits"
      :columns="collectionColumns"
      :filter="filter"
      :loading="loading"
      :grid="isScreenSizeSmall"
      row-key="index"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[rowsPerPageOptions]"
      style="height: 80vh"
      no-data-label="There are no consultations as of today!"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="blue" />
      </template>
      <template v-slot:top>
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
        <br />
        <q-btn
          rounded
          dense
          padding="1px 16px"
          no-caps
          label="All"
          @click="setStatus('')"
        />
        <q-btn
          rounded
          dense
          padding="1px 16px"
          no-caps
          label="Pending"
          @click="setStatus('NO_VITALS')"
        />
        <q-btn
          rounded
          dense
          padding="1px 16px"
          no-caps
          label="Completed"
          @click="setStatus('COMPLETED')"
        />
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
          @click="useRouter().push(`/consultation/${props.row.id}`)"
          style="cursor: pointer"
          align="center"
        >
          <q-tr :props="props">{{ props.value }}</q-tr>
        </q-td>
      </template>
    </q-table>
  </section>
</template>

<script setup>
import { format } from "date-fns";
const $q = useQuasar();

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
  {
    name: "Student",
    required: true,
    label: "Student Name",
    align: "left",
    field: "Student",
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
    sortable: true,
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
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
});
const filter = ref("");

const status = ref("");

const { data } = useAuth();

const user = data.value.user;
onMounted(async () => {
  try {
    visits.value = await $fetch(
      "/api/visit/visit?" +
        new URLSearchParams({
          doctorId: user.id,
        })
    );
  } catch (error) {
    console.log(error);
  } finally {
    if (!visits.value) visits.value = [];
  }

  loading.value = false;
});

async function setStatus(type) {
  loading.value = true;
  status.value = type;
  console.log(type);
  try {
    visits.value = await $fetch(
      "/api/visit/visit?" +
        new URLSearchParams({
          doctorId: user.id,
          status: status.value,
        })
    );
  } catch (error) {
    console.log(error);
  } finally {
    if (!visits.value) visits.value = [];
  }

  loading.value = false;
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
