import { setStorage, getStorage, removeStorage } from '../util/common'
import * as types from "./mutations-type"
import { get } from '../util/axios'

const login = {
    state: {
        isLogin: getStorage('isLogin') || false,
        user: getStorage('user') || {}
    },
    mutations: {
        [types.SET_USER_INFO](state, data) {
            state.user = data
        },
        [types.CLEAR_USER](state) {
            state.user = {}
        },
        [types.UPDATE_LOGINSTATE](state, bool) {
            state.isLogin = bool
        }
    },
    actions: {
        async setUser({ state, commit }, value) {
            let userInfo = {};
            if (typeof value === 'string' && value == 'getUserInfo') {
                // const res = await get('/user/userinfo?id='+state.user._id);
                const res = await get('/user/userinfo', {
                    params: {
                        id: state.user._id
                    }
                });
                console.log('用户信息', res)
                if (res) {
                    userInfo = res;
                }
            } else {
                userInfo = value
            }
            setStorage('user', userInfo);
            commit(types.SET_USER_INFO, userInfo);
        },
        logout({ commit }) {
            removeStorage('user');
            removeStorage('isLogin');
            commit(types.CLEAR_USER);
            commit(types.UPDATE_LOGINSTATE, false);
        },
        /** 更新用户登录状态 */
        updateLoginState({ commit }, bool) {
            setStorage('isLogin', bool);
            commit(types.UPDATE_LOGINSTATE, bool);
        }
    }
}
export default login