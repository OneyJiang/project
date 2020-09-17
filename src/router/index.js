import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Regist from '../views/regist.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'mall',
    component: Home,
    children: [
      { path: 'mall', name: 'mall', component: () => import('../views/mall.vue') },
      { path: 'user', name: 'user', component: () => import('../views/user.vue') }
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

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
