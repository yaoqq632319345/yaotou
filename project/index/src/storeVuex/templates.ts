import type { Module } from 'vuex';
import type { GlobalDataProps, TemplatesProps } from '@/stroeTypes';
import { testData } from '@/storeDatas';

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData,
  },
  getters: {
    getTemplateById: (state, getters, rootState) => (id: number) => {
      return state.data.find((t) => t.id === id);
    },
  },
};

export default templates;
