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
export const constantRouterMap = [{
    path: '/login',
    component: login
  },
  {
    path: '/404',
    component: err404
  },
  {
    path: '/403',
    component: err403
  },
  {
    path: '/500',
    component: err500
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: dashBoard,
      meta: {
        title: '首页',
        icon: 'fa-tachometer'
      },
    }]
  },
  {
    path: '/example',
    name: 'example',
    component: Layout,
    redirect: '/example/testone',
    meta: {
      title: '系统管理平台',
      icon: 'fa-assistive-listening-systems'
    },
    children: [{
        path: 'testone',
        name: 'dcp-testone',
        component: testonea,
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'testtwo',
        name: 'dcp-testtwo',
        component: testtwoa,
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'testthree',
        name: 'dcp-testthree',
        component: testthreea,
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'testfour',
        name: 'dcp-testfour',
        component: testtwoa,
        meta: {
          title: '注册中心'
        }
      },
      {
        path: 'testfive',
        name: 'dcp-testfive',
        component: testthreea,
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
      component: testonea,
      meta: {
        title: '测试页面1'
      }
    },
    {
      path: 'testtwo',
      name: 'dcp-testtwo',
      component: testtwoa,
      meta: {
        title: '测试页面2'
      }
    },
    {
      path: 'testthree',
      name: 'dcp-testthree',
      component: testthreea,
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
