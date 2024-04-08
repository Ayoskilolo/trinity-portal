<template>
  <section class="top-profile">
    <q-btn
      flat
      filled
      to="/student"
      icon="arrow_back_ios"
      color="white items-center"
      class="bg-amber-5"
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
            {{ currentClient.firstName }} {{ currentClient.lastName }}
          </span>
        </q-card-section>

        <q-card-section v-if="isEmpty(activeLoan)">
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
              <span class="text-h6 ellipsis">
                ₦{{
                  activeLoan.amountOutstanding.toLocaleString("en-US")
                }}</span
              >
            </q-card-section>

            <q-card-section
              class="q-pr-sm"
              style="border: 1px solid #f8f3e9; border-radius: 10px"
            >
              <span class="text-body2">Total Amount Collected:</span>
              <br />
              <span class="text-h6 ellipsis">
                ₦{{ activeLoan.amountCollected.toLocaleString("en-US") }}</span
              >
            </q-card-section>
          </q-card-section>
          <q-btn
            flat
            no-caps
            outline
            label="Initiate Manual Collection"
            class="bg-amber-5 text-black q-mt-sm"
            style="width: 100%"
            @click="initiateManualCollection = !initiateManualCollection"
          />
        </div>
      </q-card>
    </div>
  </section>
</template>

<script setup>
const loading = ref(true);
const currentClient = ref({
  firstName: "Ayomide",
  lastName: "Afolabi",
});
const $q = useQuasar();

const isScreenSizeSmall = computed(() => {
  return $q.screen.lt.sm ? true : false;
});

const avatarSize = computed(() => {
  return isScreenSizeSmall.value ? "30px" : "100px";
});
</script>
