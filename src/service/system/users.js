import request from '@/util/request';
// import qs from 'qs';

const getUserList = async (pageNum, pageSize) => {
  return request('POST', '/user/v1.0/listUserInfo', {
    pageNum,
    pageSize
  });
};
// 当机构的选择发生变化的时候，根据所选机构去请求所选部门的下拉选框数据
const getDepartment = (organization) => request('GET', `/department/v1.0/listDepartmentInfo/${organization}`);
// 获取角色信息
const getListOfRole = () => request('GET', `/user/v1.0/initUserInfo`);
// 保存用户
const saveUserInfo = (userObj) => request('POST', `/user/v1.0/saveUserInfo`, userObj);
// 修改用户信息
const modifyUserInfo = userInfo => request('POST', `/user/v1.0/modifyUserInfo`, userInfo);
// 获取用户信息
const getUserInfoById = id => request('GET', `/user/v1.0/getUserInfo/${id}`);
// 获取部门列表
const getListOfDept = obj => request('POST', `/department/v1.0/listDepartmentInfo`, obj);
export {
  getUserList,
  getDepartment,
  getListOfRole,
  saveUserInfo,
  modifyUserInfo,
  getUserInfoById,
  getListOfDept
};
