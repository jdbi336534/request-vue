/* eslint eqeqeq:0 */
import moment from 'moment';

let toString = Object.prototype.toString;
let pSlice = Array.prototype.slice;

let oliver = {
  /**
   * 获取deferred对象
   * @return {[type]} [description]
   */
  defer() {
    let deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    return deferred;
  },
  /**
   * check object is object
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isObject: obj => {
    return toString.call(obj) === '[object Object]';
  },
  /**
   * check object is string
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isString: obj => {
    return toString.call(obj) === '[object String]';
  },
  /**
   * check object is number
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isNumber: obj => {
    return toString.call(obj) === '[object Number]';
  },
  /**
   * check object is boolean
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isBoolean: obj => {
    return toString.call(obj) === '[object Boolean]';
  },
  /**
   * check object is array
   * @param  {Mixed}  obj []
   * @return {Boolean}     []
   */
  isArray: obj => {
    return toString.call(obj) === '[object Array]';
  },
  isDate: obj => {
    return toString.call(obj) === '[object Date]';
  },
  isRegExp: obj => {
    return toString.call(obj) === '[object RegExp]';
  },
  isNullOrUndefined: obj => {
    return obj === null || obj === undefined;
  },
  isArguments: obj => {
    return toString.call(obj) === '[object Arguments]';
  },
  /**
   * check object is mepty
   * @param  {[Mixed]}  obj []
   * @return {Boolean}     []
   */
  isEmpty: obj => {
    if (oliver.isObject(obj)) {
      for (let key in obj) {
        return !key && !0;
      }
      return true;
    } else if (oliver.isArray(obj)) {
      return obj.length === 0;
    } else if (oliver.isString(obj)) {
      return obj.length === 0;
    } else if (oliver.isNumber(obj)) {
      return obj === 0;
    } else if (obj === null || obj === undefined) {
      return true;
    } else if (oliver.isBoolean(obj)) {
      return !obj;
    }
    return false;
  },
  isPrimitive: arg => {
    return (
      arg === null ||
      typeof arg === 'boolean' ||
      typeof arg === 'number' ||
      typeof arg === 'string' ||
      typeof arg === 'symbol' || // ES6 symbol
      typeof arg === 'undefined'
    );
  },
  extend: (target, ...args) => {
    target = target || {};
    let i = 0;
    let length = args.length;
    let options;
    let name;
    let src;
    let copy;
    for (; i < length; i++) {
      options = args[i];
      if (!options) {
        continue;
      }
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (src && src === copy) {
          continue;
        }
        if (oliver.isObject(copy)) {
          target[name] = oliver.extend(
            src && oliver.isObject(src) ? src : {},
            copy
          );
        } else if (oliver.isArray(copy)) {
          target[name] = oliver.extend([], copy);
        } else {
          target[name] = copy;
        }
      }
    }
    return target;
  },
  deepEqual: (actual, expected) => {
    function objEquiv(a, b) {
      if (oliver.isNullOrUndefined(a) || oliver.isNullOrUndefined(b)) {
        return false;
      }
      // an identical 'prototype' property.
      if (a.prototype !== b.prototype) return false;
      // if one is a primitive, the other must be same
      if (oliver.isPrimitive(a) || oliver.isPrimitive(b)) return a === b;
      let aIsArgs = oliver.isArguments(a);
      let bIsArgs = oliver.isArguments(b);
      if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs)) return false;
      if (aIsArgs) {
        a = pSlice.call(a);
        b = pSlice.call(b);
        return oliver.deepEqual(a, b);
      }
      let ka = Object.keys(a);
      let kb = Object.keys(b);
      let key;
      let i;
      // having the same number of owned properties (keys incorporates
      // hasOwnProperty)
      if (ka.length != kb.length) return false;
      // the same set of keys (although not necessarily the same order),
      ka.sort();
      kb.sort();
      // ~~~cheap key test
      for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i]) return false;
      }
      // equivalent values for every corresponding key, and
      // ~~~possibly expensive deep test
      for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!oliver.deepEqual(a[key], b[key])) return false;
      }
      return true;
    }

    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
      return true;
    } else if (oliver.isDate(actual) && oliver.isDate(expected)) {
      return actual.getTime() === expected.getTime();

      // 7.3 If the expected value is a RegExp object, the actual value is
      // equivalent if it is also a RegExp object with the same source and
      // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
    } else if (oliver.isRegExp(actual) && oliver.isRegExp(expected)) {
      return (
        actual.source === expected.source &&
        actual.global === expected.global &&
        actual.multiline === expected.multiline &&
        actual.lastIndex === expected.lastIndex &&
        actual.ignoreCase === expected.ignoreCase
      );

      // 7.4. Other pairs that do not both pass typeof value == 'object',
      // equivalence is determined by ==.
    } else if (oliver.isArray(actual) && oliver.isArray(expected)) {
      return objEquiv(actual, expected);
    } else if (!oliver.isObject(actual) && !oliver.isObject(expected)) {
      return actual == expected;

      // 7.5 For all other Object pairs, including Array objects, equivalence is
      // determined by having the same number of owned properties (as verified
      // with Object.prototype.hasOwnProperty.call), the same set of keys
      // (although not necessarily the same order), equivalent values for every
      // corresponding key, and an identical 'prototype' property. Note: this
      // accounts for both named and indexed properties on Arrays.
    } else {
      return objEquiv(actual, expected);
    }
  },

  formatTime(str) {
    return str ? moment(new Date(str)).format('YYYY-MM-dd HH:mm:ss') : '';
  },

  /**
   * 存储localStorage
   */
  setStore: (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  /**
   * 获取localStorage
   */
  getStore: name => {
    if (!name) return;
    return window.localStorage.getItem(name);
  },

  /**
   * 删除localStorage
   */
  removeStore: name => {
    if (!name) return;
    window.localStorage.removeItem(name);
  },

  /**
   * 存储sessionStorage
   */
  setSessionStore: (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  },

  /**
   * 获取sessionStorage
   */
  getSessionStore: name => {
    if (!name) return;
    var obj = window.sessionStorage.getItem(name);
    try {
      return JSON.parse(obj);
    } catch (e) {
      return obj;
    }
  },

  /**
   * 删除sessionStorage
   */
  removeSessionStore: name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
  }
};

export default oliver;
