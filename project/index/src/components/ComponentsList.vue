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
import { imageDefaultProps, type TextComponentProps } from '@/defaultProps';
import type { ComponentData } from '@/stroeTypes';
import { defineComponent, type PropType } from 'vue';
import LText from '../components/LText.vue';
import StyledUploader from '../components/StyledUploader.vue';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'ant-design-vue';
import type { UploadResp } from '@/extraType';

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
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        name: 'l-text',
        id: uuidv4(),
        props,
      };
      context.emit('on-item-click', componentData);
    };
    const onImageUploaded = (resp: UploadResp) => {
      const componentData: ComponentData = {
        name: 'l-image',
        id: uuidv4(),
        props: {
          ...imageDefaultProps,
        },
      };
      message.success('上传成功');
      componentData.props.src = resp.data.url;
      context.emit('on-item-click', componentData);
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
