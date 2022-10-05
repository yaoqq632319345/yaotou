import { createApp } from 'vue';
import App from './App.vue';
import antd from 'ant-design-vue';
import router from './router/index';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(antd).use(router);
app.mount('#app');
