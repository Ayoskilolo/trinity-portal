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

    <section>
      <q-table
        flat
        :bordered="isScreenSizeSmall"
        table-header-style="background-color: lightblue"
        title="Visit History"
        :rows="visits"
        :columns="collectionColumns"
        :filter="overdueFilter"
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
            v-model="overdueFilter"
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
      </q-table>
      <p>hello</p>
    </section>
  </section>
</template>

<script setup>
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

const visits = ref();

//Display Helper Variables
const loading = ref(true);
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
});

onMounted(async () => {
  loading.value = false;
});
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
