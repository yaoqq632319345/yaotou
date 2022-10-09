<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const withHeader = computed(() => route.meta.withHeader);
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped></style>
