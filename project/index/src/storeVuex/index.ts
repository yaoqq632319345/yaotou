import type { GlobalDataProps } from '@/stroeTypes';
import { createStore } from 'vuex';
import templates from './templates';
import user from './user';

const store = createStore<GlobalDataProps>({
  modules: {
    templates,
    user,
  },
});

export default store;
