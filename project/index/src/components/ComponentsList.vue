<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item"></l-text>
    </div>
    <StyledUploader @success="onImageUploaded"></StyledUploader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LText from '../components/LText.vue';
import StyledUploader from '../components/StyledUploader.vue';
export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ['on-item-click'],
  name: 'components-list',
  components: {
    LText,
    StyledUploader,
  },
  setup(props, context) {
    const onItemClick = (data: any) => {
      context.emit('on-item-click', data);
    };
    const onImageUploaded = (data: any) => {
      console.log(data);
    };
    return {
      onItemClick,
      onImageUploaded,
    };
  },
});
</script>

<style>
/* .create-component-list {
  margin: 0 auto;
} */
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>
