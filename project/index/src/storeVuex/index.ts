import type { GlobalDataProps } from '@/stroeTypes';
import { createStore } from 'vuex';
import templates from './templates';
import user from './user';
import editor from './editor';

const store = createStore<GlobalDataProps>({
  modules: {
    templates,
    user,
    editor,
  },
});

export default store;
