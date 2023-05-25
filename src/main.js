import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";

import '@/styles/index.scss'// global css
import store from "@/store";
import service from "@/utils/request";


Vue.config.productionTip = false
Vue.prototype.$axios = service
// axios.defaults.baseURL = '/api'
Vue.use(ElementUI)
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})

