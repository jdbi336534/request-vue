import moment from 'moment';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
const utils = {
  /**
   * 格式化时间
   * @param {string|number|object|Array} dateTime - 时间，可以是一个字符串、时间戳、表示时间的对象、Date对象或者******表示时间的数组
   * @param {string} [fmt] - 格式
   * @returns {string} 返回格式化后的日期时间，默认格式：2018年1月11日 15:00
   * @see [momentjs]{@tutorial http://momentjs.cn/}
   */
  formatDate(dateTime, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if (!dateTime) {
      return '';
    }
    moment.locale('zh-CN');
    dateTime = moment(dateTime).format(fmt);
    return dateTime;
  },
  /**
   * check object is object
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isObject(obj) {
    return toString.call(obj) === '[object Object]';
  },
  /**
   * check object is string
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isString(obj) {
    return toString.call(obj) === '[object String]';
  },
  /**
   * check object is number
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isNumber(obj) {
    return toString.call(obj) === '[object Number]';
  },
  /**
   * check object is boolean
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isBoolean(obj) {
    return toString.call(obj) === '[object Boolean]';
  },
  /**
   * check object is array
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isArray(obj) {
    return toString.call(obj) === '[object Array]';
  },
  /**
   *获取cookie
   * @param {*} Key
   * @returns {String}
   */
  getCookie(Key) {
    return Cookies.get(Key);
  },
  /**
   * 设置cookie
   * @param {String} Key 
   * @param {String} Value 
   */
  setCookie(Key, Value) {
    return Cookies.set(Key, Value);
  },
  /**
   * 删除cookie
   * @param {Sting} Key 
   */
  removeCookie(Key) {
    return Cookies.remove(Key);
  },
  /**
   * 获取sessionStorage
   */
  saveStorage(key, data) {
    data = JSON.stringify(data);
    window.sessionStorage.setItem(key, data);
    return true;
  },
  /**
   * 存储sessionStorage
   */
  getStorage(key) {
    if (!key || typeof key !== 'string') {
      return false;
    }
    let data = window.sessionStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  },
  /**
   * 删除sessionStorage
   */
  removeStorage(key) {
    if (!key) return;
    window.sessionStorage.removeItem(key);
  },
  /**
   * CryptoJS加密
   */
  getAES(data) { //加密
    let key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; //密钥
    let iv = '1234567812345678';
    let encrypted = getAesString(data, key, iv); //密文
    let encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
    return encrypted1;
  },
  /**
   * CryptoJS解密
   */
  getDAes(data) { //解密
    let key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; //密钥
    let iv = '1234567812345678';
    let decryptedStr = getDAesString(data, key, iv);
    return decryptedStr;
  },
  /**
   * 输出当前日期和指定日期的相隔时间
   * @param {*} time
   */
  getOffsetDays(time) {
    let offsetTime = Math.abs(Date.now() - time);
    let days = Math.floor(offsetTime / (3600 * 24 * 1e3));
    if (days < 1) {
      if (Math.floor(offsetTime / (3600 * 1 * 1e3)) < 1) {
        return Math.floor((offsetTime / (3600 * 1e3)) * 60) < 1 ? '刚刚' : `${Math.floor((offsetTime / (3600 * 1e3))*60)}分钟前`
      } else {
        return `${Math.floor(offsetTime / (3600 * 1 * 1e3))}小时前`
      }
    } else if (days < 30) {
      return `${days}日前`
    } else if (days > 30) {
      return `${parseInt(days / 30)}月前`
    } else if (days > 365) {
      return `${parseInt(days / 365)}年前`
    }
  }
};
export default {
  install(Vue) {
    Vue.prototype.$utils = utils;
  }
};
