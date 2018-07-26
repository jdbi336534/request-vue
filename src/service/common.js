import request from '@/util/request';
import qs from 'qs';

const login = async (username, password) => {
  return request('get', '/login', qs.stringify({
    username,
    password
  }));
};

export {
  login
};
