<template>
  <section class="flex w-full h-1/3 p-3 items-center justify-around">
    <UCard class="h-1/2">
      <template #header> Total No Of Admitted Students </template>
      <template #body> </template>
    </UCard>
    <UCard class="h-1/2">
      <template #header> Total No Of Visitations Today </template>
      <template #body> </template>
    </UCard>
    <UCard class="h-1/2">
      <template #header> Total No Of Admitted Students </template>
      <template #body> </template>
    </UCard>
  </section>
  <section class="p-3">
    <QTable
      flat
      table-header-class="bg-cyan-100"
      :rows="people"
      :filter="filter"
      :loading="loading"
      style="height: 40vh; width: 100%"
      virtual-scroll
      v-model:pagination="pagination"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="amber" />
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
      </template>
    </QTable>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
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
