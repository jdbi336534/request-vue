import qs from 'qs';
 let axiosConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/api',
  // 请求后的数据处理
  transformResponse: [function (data) {
    return data
  }],
  // 查询对象序列化函数
  paramsSerializer: function (params) {
    return qs.stringify(params)
  },
  // 超时设置s
  timeout: 30000,
  // 跨域是否带Token
  withCredentials: true,
  responseType: 'json',
  // xsrf 设置
  //   xsrfCookieName: 'XSRF-TOKEN',
  //   xsrfHeaderName: 'X-XSRF-TOKEN',
  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 2000,
  // 自定义错误状态码范围
  validateStatus: function (status) {
    return status >= 200 && status < 300
  }
}
export default axiosConfig;
