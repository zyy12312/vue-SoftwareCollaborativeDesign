import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";

import '@/styles/index.scss'
import store from "@/store"; // global css

Vue.config.productionTip = false
Vue.prototype.HOST = 'http://127.0.0.1:8080';


Vue.use(ElementUI)
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})

