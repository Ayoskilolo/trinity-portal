<template>
  <div>hello visits</div>
</template>

<script setup>
definePageMeta({
  layout: "home",
  middleware: "auth",
});
</script>
