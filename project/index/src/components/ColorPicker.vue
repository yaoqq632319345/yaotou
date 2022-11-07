<template>
  <div class="lego-color-picker">
    <div class="native-color-container">
      <input
        id="color"
        type="color"
        :value="modelValue"
        @input="onChange((<HTMLInputElement>$event.target).value)"
      />
    </div>
    <ul class="picked-color-list">
      <li
        v-for="(item, key) in colors"
        :key="key"
        :class="`item-${key}`"
        @click.prevent="onChange(item)"
      >
        <div
          :style="{ backgroundColor: item }"
          class="color-item"
          v-if="item.startsWith('#')"
        ></div>
        <div v-else class="color-item transparent-back"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    // 多个v-model + 修饰符
    testModifiers: { default: () => ({}) },
    test: {
      type: String,
    },
    // 自定义修饰符 v-model.xxx => props.modelModifiers.xxx
    modelModifiers: { default: () => ({}) },
    modelValue: {
      type: String,
    },
    colors: {
      type: Array as PropType<string[]>,
      default: () => [
        '#ffffff',
        '#f5222d',
        '#fa541c',
        '#fadb14',
        '#52c41a',
        '#1890ff',
        '#722ed1',
        '#8c8c8c',
        '#000000',
        '',
      ],
    },
  },
  emits: ['update:modelValue', 'update:test'],
  setup(props, context) {
    const onChange = (color: string) => {
      context.emit('update:modelValue', color);
    };
    return {
      onChange,
    };
  },
});
</script>

<style></style>
