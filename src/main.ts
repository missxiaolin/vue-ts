import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible'
import 'babel-polyfill'

import { Button } from 'vant';

Vue.use(Button)

import '@/assets/css/common.scss'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
