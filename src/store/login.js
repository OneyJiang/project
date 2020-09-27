// import { setStorage, getStorage, removeStorage } from '../util/common'
import * as types from "./mutations-type"
import { get } from '../util/axios'

const login = {
    state: {
      user: JSON.parse(localStorage.getItem('user')) || {}
    },
    mutations: {
      [types.SET_USER_INFO](state, data) {
          state.user = data
      },
      [types.CLEAR_USER](state) {
          state.user = {}
      }
    },
    actions: {
        async setUser({ state, commit }, value) {
          let userInfo = {};
          if (typeof value === 'string' && value == 'getUserInfo') {
            const res = await get('/user/userinfo', {
              params: {
                  id: state.user._id
              }
            });
            if (res) {
              console.log('用户', res);
              localStorage.setItem('user', JSON.stringify(res))
              userInfo = JSON.parse(JSON.stringify(res));
            }
          } else {
            userInfo = value
          }
          localStorage.setItem('user', JSON.stringify(userInfo))
          commit(types.SET_USER_INFO, userInfo); // 提交mutation
        },
        logout({ commit }) {
          // removeStorage('user');
          localStorage.removeItem('user')
          commit(types.CLEAR_USER);
        }
    }
}
export default login