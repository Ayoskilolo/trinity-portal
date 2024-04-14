<template>
  <body class="flex h-screen w-screen divide-y bg-white text-black">
    <section
      class="w-1/6 p-3 min-w-50 h-full border-r border-black"
      v-if="drawer"
    >
      <div
        class="border border-black rounded-md h-32 mb-10 p-2 flex items-center gap-3"
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
          size="md"
        />
        <div>
          <p>Ayomide Afolabi</p>
          <p class="font-thin">Doctor</p>
        </div>
      </div>
      <UVerticalNavigation
        :links="navigationSections"
        class="h-4/5"
        :ui="{ padding: 'p-2', size: 'text-md' }"
      />
      <UButton label="Sign Out" color="cyan" block @click="logoutFromPortal" />
    </section>
    <section class="w-5/6">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title> {{ pageHeading }} </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>

      <slot />
    </section>
  </body>
</template>

<script setup lang="ts">
const route = useRoute();
const drawer = ref(true);
const pageHeading = computed(() => {
  const match = route.fullPath.match(/^\/(\w+)\/?.*$/);
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
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: "i-heroicons-command-line",
    },
    {
      label: "Students",
      to: "/student",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
    {
      label: "Visits",
      to: "/visit",
      icon: "i-heroicons-home",
    },
  ],
];

const { data, signOut } = useAuth();

async function logoutFromPortal() {
  await signOut();
  navigateTo("/auth");
}

// onMounted(()=> {

// })
</script>
