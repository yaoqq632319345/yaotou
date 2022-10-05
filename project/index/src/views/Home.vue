<template>
  <div class="content-container">
    <template-list :list="testData"></template-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TemplateList from '../components/TemplateList.vue';
const testData = [
  {
    id: 1,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: '前端架构师直播海报',
  },
  {
    id: 2,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: '前端架构师直播海报',
  },
  {
    id: 3,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-682056.png',
    title: '前端架构师直播海报',
  },
  {
    id: 4,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: '前端架构师直播海报',
  },
  {
    id: 5,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: '前端架构师直播海报',
  },
  {
    id: 6,
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    title: '前端架构师直播海报',
  },
];
export default defineComponent({
  components: {
    TemplateList,
  },
  setup() {
    return {
      testData,
    };
  },
});
</script>

<style>
.page-title {
  color: #fff;
}
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>
