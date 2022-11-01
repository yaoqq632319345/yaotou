<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">{{ count }}</button>
  <hello msg="1234"></hello>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Hello from './Hello.vue';
export default defineComponent({
  name: 'HelloWorld',
  components: {
    Hello,
  },
  props: {
    msg: String,
  },
  setup() {
    const count = ref(1);
    return {
      count,
    };
  },
});
</script>
