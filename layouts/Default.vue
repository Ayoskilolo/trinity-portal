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
          <p v-if="user.role === 'nurse'">{{ data?.user.userName }}</p>
          <p v-else>{{ data.user.firstName }} {{ data?.user.lastName }}</p>
          <p class="font-thin">{{ data?.user.role }}</p>
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
          <q-btn
            flat
            round
            dense
            icon="notifications"
            v-if="user.role === 'student'"
          >
            <q-menu>
              <q-list style="width: 500px; color: black">
                <q-item clickable v-close-popup>
                  <q-item-section
                    >Don't forget to take your medication!</q-item-section
                  >
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section
                    >Don't forget to take your medication!</q-item-section
                  >
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section
                    >Don't forget to take your medication!</q-item-section
                  >
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section
                    >Don't forget to take your medication!</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
            <q-badge color="red" rounded floating>4</q-badge>
          </q-btn>
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
    headingString = heading.charAt(0).toUpperCase() + heading.slice(1);
  }

  if (headingString === "Homes" || headingString === "Dashboards") {
    return "Dashboard";
  } else {
    return headingString;
  }
});

const navigationSections = ref();

const { data, signOut } = useAuth();

const user = data.value.user;

onMounted(async () => {
  if (user) {
    switch (user.role) {
      case "student":
        navigationSections.value = [
          [
            {
              label: "Visits",
              to: "/visit",
              icon: "i-heroicons-home-modern-solid",
            },
            // {
            //   label: "Prescriptions",
            //   to: "/prescription",
            //   icon: "i-heroicons-shopping-cart",
            // },
            {
              label: "Feedback",
              to: "/feedback",
              icon: "i-heroicons-shopping-cart",
            },
          ],
        ];
        break;
      case "doctor":
        navigationSections.value = [
          [
            {
              label: "Consultations",
              to: "/consultation",
              icon: "i-heroicons-user-group",
            },
          ],
        ];
        break;
      case "nurse":
        navigationSections.value = [
          [
            {
              label: "Students",
              to: "/student",
              icon: "i-heroicons-user-circle",
            },
            // {
            //   label: "Inventory",
            //   to: "/inventory",
            //   icon: "i-heroicons-inbox-stack",
            // },
          ],
        ];
    }
  }

  miniState.value = isScreenLowerThanMd.value;

  if (isScreenLowerThanSm.value) {
    drawer.value = !drawer.value;
  }
});

async function logoutFromPortal() {
  await signOut();
}
</script>
