<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    const uploadedFile = files[0];
    const formData = new FormData();
    formData.append(uploadedFile.name, uploadedFile);
    axios
      .post('http://local.test:7001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        console.log(resp.data);
      });
  }
};

const route = useRoute();
const withHeader = computed(() => route.meta.withHeader);
</script>

<template>
  <div class="app-container">
    <form method="post" action="http://local.test:7001/api/upload">
      <input type="file" name="file" @change="handleFileChange" />
      <input type="text" name="test" />
      <button type="submit">Submit</button>
    </form>
    <router-view />
  </div>
</template>

<style scoped></style>
