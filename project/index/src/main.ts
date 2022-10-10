import { createApp } from 'vue';
import App from './App.vue';
import antd from 'ant-design-vue';
import router from './router/index';

import store from '@/storeVuex';
import { createPinia } from 'pinia';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(antd)
  .use(router)
  .use(createPinia())
  .use(store)
  .mount('#app');
