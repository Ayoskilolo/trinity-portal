<template>
  <section class="p-3 w-12/12 border-1">
    <QTable
      flat
      table-header-class="bg-cyan-100"
      :rows="students"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      style="height: 90vh; width: 100%"
      virtual-scroll
      v-model:pagination="pagination"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="blue" />
      </template>
      <template v-slot:top>
        <section class="flex-col w-full">
          <div class="flex">
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
            <!-- <q-btn
              flat
              dense
              filled
              no-caps
              label=" Hello"
              class="bg-cyan-100"
              style="width: 20%"
            /> -->
          </div>
          <div class="flex pt-2" style="gap: 8px">
            <QBtn
              no-caps
              label="100 Level"
              rounded
              dense
              padding="1px 16px"
              @click="getAllStudents('FRESHMAN')"
            />
            <QBtn
              no-caps
              label="200 Level"
              rounded
              dense
              padding="1px 16px"
              @click="getAllStudents('SOPHMORE')"
            />
            <QBtn
              no-caps
              label="300 Level"
              rounded
              dense
              padding="1px 16px"
              @click="getAllStudents('JUNIOR')"
            />
            <QBtn
              no-caps
              label="400 Level"
              rounded
              dense
              padding="1px 16px"
              @click="getAllStudents('SENIOR')"
            />
            <QBtn
              no-caps
              label="All Levels"
              rounded
              dense
              padding="1px 16px"
              @click="getAllStudents()"
            />
          </div>
        </section>
      </template>
      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          @click="router.push(`/student/${props.row.matricNumber}`)"
          style="cursor: pointer"
          align="center"
        >
          <q-tr :props="props">{{ props.value }}</q-tr>
        </q-td>
      </template>
    </QTable>
  </section>
</template>

<script setup lang="ts">
const filter = ref();
const $q = useQuasar();
const router = useRouter();
//Display Helper Variables
const loading = ref(true);
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
});
const students = ref([]);

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

watch(
  () => $q.screen.name,
  () => {
    pagination.value.rowsPerPage = getItemsPerPage();
  }
);

definePageMeta({
  middleware: "auth",
});
const studentSearchModal = ref(false);

async function getAllStudents(filter?: string) {
  loading.value = true;
  try {
    if (!filter) {
      students.value = await $fetch("/api/student");
    } else {
      students.value = await $fetch(
        "/api/student?" +
          new URLSearchParams({
            level: filter,
          })
      );
    }
  } catch (error) {
    students.value = [];
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await getAllStudents();
  loading.value = false;
});

const columns = [
  {
    name: "matricNumber",
    label: "Matric Number",
    align: "left",
    field: "matricNumber",
  },
  {
    name: "firstName",
    label: "First Name",
    align: "left",
    field: "firstName",
  },
  {
    name: "lastName",
    label: "Last Name",
    align: "left",
    field: "lastName",
  },
  {
    name: "level",
    label: "Level",
    align: "left",
    field: "level",
    format: (val: any) => formatLevel(val),
  },
  {
    name: "college",
    label: "College ",
    align: "left",
    field: "college",
  },
];

function formatLevel(level: string) {
  switch (level) {
    case "FRESHMAN":
      return "100 Level";
    case "SOPHMORE":
      return "200 Level";
    case "JUNIOR":
      return "300 Level";
    case "SENIOR":
      return "400 Level";
  }
}
</script>
