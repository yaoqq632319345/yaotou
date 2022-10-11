import { testData } from '@/storeDatas';
import type { GlobalDataProps } from '@/stroeTypes';
import { createStore } from 'vuex';

const store = createStore<GlobalDataProps>({
  state: {
    templates: testData,
    user: { isLogin: false },
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, userName: 'userName' };
    },
    logout(state) {
      state.user = { isLogin: false };
    },
  },
  getters: {
    getTemplateById: (state) => (id: number) =>
      state.templates.find((t) => t.id === id),
  },
});

export default store;
