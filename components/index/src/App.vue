<script lang="ts">
import { defineComponent } from 'vue';
export interface TestProps {
  name: string;
}
export default defineComponent({
  name: 'App',
});
</script>

<template>
  <div class="app-container"></div>
</template>

<style scoped>
.app-container {
  background: #000;
}
</style>
