<template>
  <div>
    <NuxtPage />
    <ClientOnly>
      <Toast />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Toast from "vue-toastification/dist/index.vue";
</script>
