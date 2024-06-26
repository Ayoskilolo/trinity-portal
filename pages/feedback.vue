<template>
  <section class="q-pa-lg">
    <q-form
      class="flex justify-center items-center"
      style="width: 100%; height: 80vh"
    >
      <q-card style="width: 70%" class="q-pa-lg flex flex-col justify-center">
        <p class="text-h5">Let Us know What Issue you're experiencing!</p>
        <br />
        <br />
        <br />
        <q-input v-model="feedback" type="textarea" filled />
        <br />
        <br />
        <br />
        <q-btn no-caps @click="SubmitFeedBack" color="cyan-4">Submit</q-btn>
      </q-card>
    </q-form>
  </section>
</template>

<script setup>
const feedback = ref();

function SubmitFeedBack() {
  Notify.create({
    position: "top-right",
    message: "Your feedback has been received!",
    color: "positive",
  });

  console.log(feedback);
}
</script>
