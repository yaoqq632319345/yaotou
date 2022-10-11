import type { Module } from 'vuex';
import type { GlobalDataProps, UserProps } from '@/stroeTypes';

const user: Module<UserProps, GlobalDataProps> = {
  mutations: {
    login(state) {
      state.isLogin = true;
      state.userName = 'viking';
    },
    logout(state) {
      state.isLogin = false;
    },
  },
};

export default user;
