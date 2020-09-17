import { create } from 'axios';
import { Message } from 'element-ui';
import Config from './config.js';
const api = create({
    baseURL: Config.host,
    timeout: 30000,
});

api.interceptors.request.use(
    request => {
        // 请求
        return request;
    },
    error => {
        return Promise.reject(error);
    },
);
api.interceptors.response.use(
    response => {
        // 返回的数据
        console.info(response.config.method.toUpperCase() + ' 方式获得的数据', response);
        return response;
    },
    error => {
        //拦截错误
        if (error.response.status === 401) {
            //如果登录状态失效了
            //清除本地缓存的to-ken
            //清除本地缓存的isLogin avatar
            localStorage.removeItem('isLogin');
            localStorage.removeItem('user');
            // 跳转到登录
            // Message({message: '登录状态过期，请重新登录', type: 'warning'});
            // this.$router.push({ name: 'login' });

        }
        console.log('error');
        console.log(error);
        console.log(JSON.stringify(error));
        return Promise.reject(error);
    },
);

/**
 * @description 发起post请求
 * @param {*} url 服务地址
 * @param {*} data post的数据
 */
export const post = async (url, data) => {
    const response = await api.post(url, data).catch(
        (error) => {
            errorHandler(error);
        }
    );
    return responseHandler(response);
}

/**
 * @description 发起get请求
 * @param {*} url 服务地址
 * @param {*} data get时带的数据
 */
export const get = async (url, data) => {
    const response = await api.get(url, data).catch(
        (error) => {
            errorHandler(error);
        }
    );
    return responseHandler(response);
}

// 处理错误
const errorHandler = (error) => {
  if (error && error.message) {
    Message({ message: error.message, type: 'error' });
    return
  }
  Message({ message: '请求发生错误，请重试', type: 'error' }); 
}

// 处理正确返回
const responseHandler = (response) => {
  console.log('axios--------->', response)
  if (response && response.status == 200) {
    if (!response.data) {
      return {}
    }
    return response.data
  } else {
    console.log('response', response)
      Message({message: response.data.message, type: 'error'});
  }
  // if (response&& response.success) {
  //   console.log('axios--------->', response)
  //   let returnData = response.data || {}
  //   return returnData
  // }
  // // 逻辑错误
  // return response.data
}

/** get
 * this.yGet('api/api?id=' + id);
 */

/** post
 * this.yPost('api/api', {id:id});
 */