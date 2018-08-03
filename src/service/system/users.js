import request from '@/util/request';
// import qs from 'qs';

const getUserList = async (pageNum, pageSize) => {
  return request('post', '/user/v1.0/listUserInfo', {
    pageNum,
    pageSize
  });
};

export {
  getUserList
};
