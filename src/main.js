// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import ElementUI from 'element-ui';
import utils from '@/util/';
import 'reset-css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';
import './permission.js';

Vue.use(ElementUI);
Vue.use(utils);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
