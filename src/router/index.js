import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/Layout/Layout';
// import BlackRoute from '@/components/BlackRoute';

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
      title: '系统管理',
      icon: 'fa-assistive-listening-systems'
    },
    children: [
      {
        path: 'users',
        name: 'dcp-users',
        component: () => import('@/views/system/users'),
        meta: {
          title: '用户管理',
        }
      },
      {
        path: 'createUsers',
        name: 'dcp-users-create',
        component: () => import('@/views/system/users/opUser'),
        hidden: true,
        meta: {
          title: '新增用户'
        }
      },
      {
        path: 'modifyUsers',
        name: 'dcp-users-modify',
        component: () => import('@/views/system/users/opUser'),
        hidden: true,
        meta: {
          title: '编辑用户'
        }
      },
      {
        path: 'testtwo',
        name: 'dcp-testtwo',
        component: () => import('@/views/testpage/test1'),
        meta: {
          title: '机构管理'
        }
      },
      // {
      //   path: 'testthree',
      //   name: 'dcp-testthree',
      //   component: () => import('@/views/testpage/test1'),
      //   meta: {
      //     title: '部门管理'
      //   }
      // },
      // {
      //   path: 'testfour',
      //   name: 'dcp-testfour',
      //   component: () => import('@/views/testpage/test1'),
      //   meta: {
      //     title: '注册中心'
      //   }
      // },
      // {
      //   path: 'testfive',
      //   name: 'dcp-testfive',
      //   component: () => import('@/views/testpage/test1'),
      //   meta: {
      //     title: '配置中心'
      //   }
      // }
    ]
  },
  {
    path: '/background',
    name: 'background',
    component: Layout,
    redirect: '/background/log',
    meta: {
      title: '后台管理',
      icon: 'fa-assistive-listening-systems'
    },
    children: [
      {
        path: 'log',
        name: 'background-log',
        component: () => import('@/views/background/log'),
        meta: {
          title: '日志查询'
        }
      },
      {
        path: 'resource',
        name: 'background-resource',
        // component: () => import('@/views/background/resource'),
        meta: {
          title: '资源管理'
        },
        children: [

        ]
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
