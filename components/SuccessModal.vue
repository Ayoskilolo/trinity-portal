<template>
  <div class="success-card">
    <svg
      class="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <path
        class="checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
    <br />

    <div class="text-center">
      <p>Your visit has been booked!</p>
    </div>
    <q-btn
      no-caps
      label="Close"
      v-close-popup
      class="full-width done"
      flat
      @click="closeModal"
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
.success-card {
  background-color: white;
  border-radius: 12px;
  padding: 5%;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: justify;
  width: 80%;
}
.top {
  flex: 3;
}

.done {
  background-color: lightblue;
  color: white;
  font-weight: 600;
  padding: 12px 30px;
}

/* CSS for Successful Payment Ring */
.success-animation {
  margin: 100px auto;
}

.checkmark {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #f0b944;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #f0b944;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
  position: relative;
  top: 5px;
  right: 5px;
  margin: 0 auto;
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 0.2;
  stroke-miterlimit: 10;
  stroke: #f0b944;
  fill: #fff;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #f0b944;
  }
}
</style>
