import request from '@/util/request';
// import { stringify } from 'qs';

export async function queryActivities() {
  return request(
    '/api/statistics/v1.0/dataResourcesTotalAndIncremental/2018-03-10/week'
  );
}

//   export async function queryRule(params) {
//     return request(`/api/rule?${stringify(params)}`);
//   }

export async function login(params) {
  return request('/api/sys/v1.0/login', {
    method: 'POST',
    body: params
  });
}
