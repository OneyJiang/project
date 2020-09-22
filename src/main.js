import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

import { get, post,put,del } from './util/axios'
Vue.prototype.yGet = get
Vue.prototype.yPost = post
Vue.prototype.yPut = put
Vue.prototype.yDel = del

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
