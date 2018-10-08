import request from '@/util/request';
import qs from 'qs';

const login = async (username, password) => {
  return request('post', `/login?${qs.stringify({username, password})}`, {}, {}, false);
};

export {
  login
};
