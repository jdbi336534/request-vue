import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
// import login from '@/views/login';
// import err404 from '@/views/errorPage/404';
// import err403 from '@/views/errorPage/403';
// import err500 from '@/views/errorPage/500';
import Layout from '@/views/Layout/Layout';
// import dashBoard from '@/views/dashboard/index';
// import testonea from '@/views/testpage/test1';
// import testtwoa from '@/views/testpage/test2';
// import testthreea from '@/views/testpage/test3';
// const _import = require('./_import_' + process.env.NODE_ENV)
// console.log(process.env.NODE_ENV)
Vue.use(Router);
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404')
  },
  {
    path: '/403',
    component: () => import('@/views/errorPage/403')
  },
  {
    path: '/500',
    component: () => import('@/views/errorPage/500')
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard'),
      meta: {
        title: '首页',
        icon: 'fa-tachometer'
      },
    }]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/users',
    meta: {
      title: '系统管理平台',
      icon: 'fa-assistive-listening-systems'
    },
    children: [{
        path: 'users',
        name: 'dcp-users',
        component: () => import('@/views/system/users'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'testtwo',
        name: 'dcp-testtwo',
        component: () => import('@/views/testpage/test1'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'testthree',
        name: 'dcp-testthree',
        component: () => import('@/views/testpage/test1'),
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'testfour',
        name: 'dcp-testfour',
        component: () => import('@/views/testpage/test1'),
        meta: {
          title: '注册中心'
        }
      },
      {
        path: 'testfive',
        name: 'dcp-testfive',
        component: () => import('@/views/testpage/test1'),
        meta: {
          title: '配置中心'
        }
      }
    ]
  }
];

export const asyncRouterMap = [{
  path: '/example',
  name: 'example',
  component: Layout,
  redirect: '/example/testone',
  meta: {
    title: '例子',
    icon: 'example'
  },
  children: [{
      path: 'testone',
      name: 'dcp-testone',
      component: () => import('@/views/testpage/test1'),
      meta: {
        title: '测试页面1'
      }
    },
    {
      path: 'testtwo',
      name: 'dcp-testtwo',
      component: () => import('@/views/testpage/test1'),
      meta: {
        title: '测试页面2'
      }
    },
    {
      path: 'testthree',
      name: 'dcp-testthree',
      component: () => import('@/views/testpage/test1'),
      meta: {
        title: '测试页面3'
      }
    }
  ]
}];

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
