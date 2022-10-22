<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span class="label" v-if="value.text">{{ value.text }}</span>
      <div class="prop-component">
        <component
          :is="value.component"
          :value="value.value"
          v-bind="value.extraProps"
        />
      </div>
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
    // console.log(props); // text: xxx, color: xxx ...
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          // 得到text | color ...
          const newKey = key as keyof TextComponentProps;
          // 得到text -> 组件
          const item = mapPropsToForms[newKey];
          if (item) {
            item.value = value;
            result[newKey] = item;
          }
          return result;
        },
        {} as Required<PropsToForms>
      );
    });
    return {
      finalProps,
    };
  },
});
</script>

<style>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>
