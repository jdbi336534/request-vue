import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import login from '@/views/login';
import err404 from '@/views/errorPage/404';
import err403 from '@/views/errorPage/403';
import err500 from '@/views/errorPage/500';
import Layout from '@/views/Layout/Layout';
import dashBoard from '@/views/dashboard/index';
import testonea from '@/views/testpage/test1';
import testtwoa from '@/views/testpage/test2';
import testthreea from '@/views/testpage/test3';

Vue.use(Router);
export const constantRouterMap = [
  { path: '/login', name: 'login', component: login },
  { path: '/404', name: '404', component: err404 },
  { path: '/403', name: '403', component: err403 },
  { path: '/500', name: '500', component: err500 },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        component: dashBoard
      }
    ]
  }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/testone',
    name: 'merry',
    meta: { title: '例子', icon: 'example' },
    children: [
      {
        path: 'testone',
        // name: 'pageone',
        component: testonea,
        meta: { title: '测试页面1' }
      },
      {
        path: 'testtwo',
        // name: 'pagetwo',
        component: testtwoa,
        meta: { title: '测试页面2' }
      },
      {
        path: 'testthree',
        // name: 'pahethree',
        component: testthreea,
        meta: { title: '测试页面3' }
      }
    ]
  }
];
