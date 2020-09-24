import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Regist from '../views/regist.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

import store from "../store/index"

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/user',
    component: Home,
    children: [
      { path: 'user', name: 'user', component: () => import('../views/user.vue') },
      { path: 'mall', name: 'mall', component: () => import('../views/mall.vue') }
    ]
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// const originalPush = VueRouter.prototype.push
//    VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }

router.beforeEach((to, from, next) => {
  if (to.name == 'login' || to.name == 'regist') {
    next();
  } else {
    const isLogin = store.state.login.isLogin;
    if (!isLogin) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})

export default router
