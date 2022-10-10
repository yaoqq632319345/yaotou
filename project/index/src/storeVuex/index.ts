import { testData } from '@/storeDatas';
import type { GlobalDataProps } from '@/stroeTypes';
import { createStore } from 'vuex';

const store = createStore<GlobalDataProps>({
  state: {
    templates: testData,
    user: { isLogin: false },
  },
});

export default store;
