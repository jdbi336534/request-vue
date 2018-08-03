import router from './router';
import util from '@/util';
// import store from './store'
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
// 判断是否有权限
const hasPermission = () => {
  return true;
}
// 定义白名单
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  console.log(util.checkIsLogin());
  NProgress.start(); // start progress bar
  let flag = false;
  if (util.checkIsLogin()) {
    //   如果已经登录,不会再进入登录页面
    if (to.path === '/login') {
      next({
        path: '/'
      });
      NProgress.done();
    } else {
      // 如果需要动态加载路由
      if (flag) {
        // store.dispatch('GenerateRoutes', { data: 'no-use' }).then(() => {
        // 根据roles权限生成可访问的路由表
        // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        // next({ path: to.path }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        // })
        flag = false;
      } else {
        // 动态权限判断
        if (hasPermission()) {
          next();
        } else {
          next({
            path: '/401'
          });
        }
      }
    }
  } else {
    // 如果没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done(); // 结束进度条
    }
  }
})

router.afterEach(() => {
  NProgress.done();
})
