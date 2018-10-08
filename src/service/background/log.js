import request from '@/util/request';
// import qs from 'qs';

const loglist = async (data) => {
  return request('post', `/logs/list`, data);
};

export {
  loglist
};
