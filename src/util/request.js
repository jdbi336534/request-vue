import axios from 'axios';
import router from '@/router';
import axiosConfig from './config';
import util from '@/util';
import {
  Message
} from 'element-ui';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
};

// Set config defaults when creating the instance
const instance = axios.create(axiosConfig);
// Alter defaults after instance has been created
instance.defaults.headers.common['access_token'] = util.getInfo('access_token');

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 返回状态判断(添加响应拦截器)
instance.interceptors.response.use(
  response => {
    // 对响应数据做些事(这里返回data数据)
    return response.data || {};
  },
  error => {
    // 浏览器级别code错误码处理
    let response = error.response;
    const errortext = codeMessage[response.status] || response.statusText;
    console.log(router.currentRoute.path)
    // if (response.status === 401) {
      router.replace({
        path: '/login'
      })
      console.log(router.currentRoute.path)
    // }
    throw new Error(errortext);
  }
);
// 判断后端返回的code
function checkStatus(response, checkState) {
  if (checkState) {
    if (response.code) {
      let {
        code,
        data,
        msg
      } = response;
      if ((code >= 200 && code <= 300) || code === 304) {
        if (data) {
          //  存在data
          return data;
        }
        //  不存在data
        return data||[];
        // return false;
      }
      const error = new Error(msg);
      error.status = code;
      throw error;
    } else {
      throw new Error('发送请求成功，但是没有返回数据！');
    }
  } else {
    return response;
  }
}

export default function request(method, url, data, options, checkState = true) {
  const defaultOptions = {
    credentials: 'include'
  };
  const newOptions = {
    ...defaultOptions,
    ...options
  };
  if (newOptions.method === 'post' || newOptions.method === 'put') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      ...newOptions.headers
    };
  }
  return instance({
      method,
      url: url,
      data,
      ...newOptions
    })
    .then((response) =>
      checkStatus(response, checkState)
    )
    .catch(err => {
      Message.error(err.message);
      return false;
    });
}
