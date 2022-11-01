<template>
  <h1>{{ msg }}</h1>
  <button @click="setCount">{{ count }}</button>
  <input type="text" v-model="todo" />
  <button class="addTodo" @click="addTodo">add</button>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
  </ul>
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
  emits: ['send'],
  setup(props, context) {
    const todo = ref('');
    const todos = ref<string[]>([]);
    const count = ref(1);
    const setCount = () => {
      count.value++;
    };
    const addTodo = () => {
      if (todo.value) {
        todos.value.push(todo.value);
        context.emit('send', todo.value);
      }
    };
    return {
      count,
      setCount,
      todo,
      todos,
      addTodo,
    };
  },
});
</script>
