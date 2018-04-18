import router from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({ showSpinner: true }); // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start();
  store.dispatch('GenerateRoutes', { data: 'no-use' }).then(() => {
    // 根据roles权限生成可访问的路由表
    router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
    console.log(router)
    next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
  });
  next();
});

router.afterEach(() => {
  NProgress.done();
});
