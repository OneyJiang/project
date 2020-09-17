// import { setStorage, getStorage, removeStorage } from '@common/util/common'
// import { setStorage, getStorage, removeStorage } from '@common/util/common'

const login = {
    state: {
        isLogin: false,
        user: {}
        // isLogin: getStorage('isLogin') || false,
        // user: getStorage('user') || {}
    },
    mutations: {
        setUser (state, data) {
            state.user = data
        },
        clearUser (state) {
            state.user = {}
        },
        updateLoginState (state, bool) {
            state.isLogin = bool
        }
    }
    // actions: {
    //     // 为什么commit要套{}
    //     setUser ({commit}, data) {
    //         let userInfo = Object.assign(getStorage('user') || {}, data);
    //         setStorage('user', userInfo);
    //         commit(types.SAVE_USER, userInfo);
    //     },
    //     logout ({commit}) {
    //         commit(types.CLEAR_USER);
    //         commit(types.UPDATE_LOGINSTATE, false);
    //         removeStorage('user');
    //         removeStorage('isLogin');
    //     },
    //     editLoginState ({commit}, bool) {
    //         setStorage('isLogin', bool);
    //         commit(types.UPDATE_LOGINSTATE, bool);
    //     }
    // }
}
export default login
