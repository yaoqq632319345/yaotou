<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <component v-if="value" :is="value.component" :value="value.value" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';
import { reduce } from 'lodash';
import { type PropsToForms, mapPropsToForms } from '../propsMap';
import type { TextComponentProps } from '../defaultProps';
export default defineComponent({
  name: 'props-table',
  props: {
    props: {
      type: Object as PropType<Partial<TextComponentProps>>,
      required: true,
    },
  },
  setup(props) {
    // 将所有属性对应的组件获取到
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToForms[newKey];
          if (item) {
            item.value = value;
            result[newKey] = item;
          }
          return result;
        },
        {} as PropsToForms
      );
    });
    console.log(finalProps);
    return {
      finalProps,
    };
  },
});
</script>

<style></style>
