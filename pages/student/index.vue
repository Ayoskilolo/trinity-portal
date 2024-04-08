<template>
  <section class="p-3 w-12/12 border-1">
    <QTable
      flat
      table-header-class="bg-cyan-100"
      :rows="people"
      :filter="filter"
      :loading="loading"
      style="height: 90vh; width: 100%"
      virtual-scroll
      v-model:pagination="pagination"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="amber" />
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
              style="width: 80%"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <br />
            <q-btn
              flat
              dense
              filled
              no-caps
              label=" Hello"
              class="bg-cyan-100"
              style="width: 20%"
              @click="newUserDialog = true"
            />
          </div>
          <div class="flex pt-2" style="gap: 8px">
            <QBtn no-caps label="100 Level" rounded dense padding="1px 16px" />
            <QBtn no-caps label="200 Level" rounded dense padding="1px 16px" />
            <QBtn no-caps label="300 Level" rounded dense padding="1px 16px" />
            <QBtn no-caps label="400 Level" rounded dense padding="1px 16px" />
          </div>
        </section>
      </template>
    </QTable>
  </section>

  <UModal v-model="studentSearchModal" class="p-5">
    <UInput />
    <UButton />

    <div class="p-4">Hello</div>
  </UModal>
</template>

<script setup>
const filter = ref();
const $q = useQuasar();

//Display Helper Variables
const loading = ref(true);
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
});

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
  layout: "home",
});
const studentSearchModal = ref(false);

onMounted(() => {
  // studentSearchModal.value = true;
  loading.value = false;
});

const people = [
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
];
</script>
