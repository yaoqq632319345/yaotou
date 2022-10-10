import { testData } from '@/storeDatas';
import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useList = defineStore('templateList', () => {
  const list = reactive(testData);

  return { testData: list };
});
