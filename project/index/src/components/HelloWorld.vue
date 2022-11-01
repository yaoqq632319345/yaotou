<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>
