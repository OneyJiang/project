import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

import { get, post } from './util/axios'
Vue.prototype.yGet = get
Vue.prototype.yPost = post

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
