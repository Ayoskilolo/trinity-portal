<template>
  <QLayout class="divide-y bg-white text-black" view="lHh Lpr lFf">
    <QDrawer
      class="w-1/6 p-3 min-w-50 h-full border-r border-black"
      :width="250"
      :breakpoint="500"
      v-model="drawer"
      :mini="miniState"
    >
      <div
        class="border border-black rounded-md h-32 mb-10 p-2 flex items-center gap-3"
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
          size="sm"
        />
        <div
          style="display: flex; flex-direction: column; width: 100%"
          v-if="showUserDetails"
        >
          <p>{{ data.user.email }}</p>
          <p class="font-thin">Doctor</p>
        </div>
      </div>
      <UVerticalNavigation
        :links="navigationSections"
        class="h-3/4"
        :ui="{ padding: 'p-2', size: 'text-md' }"
      />
      <UButton label="Sign Out" color="cyan" block @click="logoutFromPortal" />
    </QDrawer>
    <q-page-container>
      <q-page class="w-full">
        <q-toolbar>
          <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
          <q-toolbar-title> {{ pageHeading }} </q-toolbar-title>
          <q-btn flat round dense icon="more_vert" />
        </q-toolbar>

        <slot />
      </q-page>
    </q-page-container>
  </QLayout>
</template>

<script setup lang="ts">
const drawer = ref(true);
const miniState = ref(false);
const userName = ref();

const $q = useQuasar();

const isScreenLowerThanMd = computed(() => {
  return $q.screen.lt.md ? true : false;
});

const isScreenLowerThanSm = computed(() => {
  return $q.screen.lt.sm ? true : false;
});

const showUserDetails = computed(() => {
  return !isScreenLowerThanMd.value
    ? true
    : isScreenLowerThanSm.value && drawer.value
    ? true
    : false;
});

watch(isScreenLowerThanMd, async () => {
  miniState.value = isScreenLowerThanMd.value;
});

watch(isScreenLowerThanSm, async () => {
  drawer.value = !drawer.value;
});

const pageHeading = computed(() => {
  const match = useRoute().fullPath.match(/^\/(\w+)\/?.*$/);
  let headingString;
  if (match) {
    const heading = match[match.length - 1];
    headingString = heading.charAt(0).toUpperCase() + heading.slice(1) + "s";
  }

  if (headingString === "Homes" || headingString === "Dashboards") {
    return "Dashboard";
  } else {
    return headingString;
  }
});

const navigationSections = [
  [
    // {
    //   label: "Dashboard",
    //   to: "/dashboard",
    //   icon: "i-heroicons-command-line",
    // },
    {
      label: "Students",
      to: "/student",
      icon: "i-heroicons-user-circle",
    },
    {
      label: "Visits",
      to: "/visit",
      icon: "i-heroicons-home-modern-solid",
    },
    {
      label: "Consultations",
      to: "/visit",
      icon: "i-heroicons-user-group",
    },
    {
      label: "Prescriptions",
      to: "/prescription",
      icon: "i-heroicons-shopping-cart",
    },
    {
      label: "Inventory",
      to: "/inventory",
      icon: "i-heroicons-inbox-stack",
    },
  ],
];

const { data, signOut } = useAuth();

onMounted(async () => {
  miniState.value = isScreenLowerThanMd.value;

  if (isScreenLowerThanSm.value) {
    drawer.value = !drawer.value;
  }
});

async function logoutFromPortal() {
  await signOut();
}
</script>
