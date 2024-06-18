<template>
  <div class="failure-card">
    <q-icon name="o_error" size="xl" class="red" />
    <br />
    <p v-if="props.reason">{{ props.reason }}</p>
    <p v-else>
      Something went wrong with your application but don’t worry, Try again and
      let’s work our magic.
    </p>
    <q-btn
      flat
      no-caps
      label="Close"
      @click="closeModal"
      padding="8px 35px"
      style="background-color: lightblue; color: white"
      v-close-popup
    />
  </div>
</template>

<script setup>
const emit = defineEmits(["closeModal"]);
const props = defineProps({
  reason: String,
});

function closeModal() {
  emit("closeModal");
}
</script>

<style scoped>
.failure-card {
  font-family: "DM Sans";
  background-color: white;
  border-radius: 12px;
  padding: 5%;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: justify;
}

.header {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  padding-top: 20px;
}
.red-ring {
  border-radius: 50px;
  padding: 2px;
  border: 0.5px solid #cd1544;
}

.red {
  color: #cd1544;
}
</style>
