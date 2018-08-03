import request from '@/util/request';
// import qs from 'qs';

const login = async (userName, password) => {
  return request('post', '/sys/v1.0/login', {
    userName,
    password
  }, {}, false);
};

export {
  login
};
