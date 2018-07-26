import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: true }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  let islog = true
  let flag = true
  if (islog) {
    //   如果已经登录
    // if (to.path === '/login') {
    //   next({ path: '/' })
    //   NProgress.done()
    // } else {
      if (flag) {
        store.dispatch('GenerateRoutes', { data: 'no-use' }).then(() => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ path: to.path }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
        flag = false
      }
      next()
    // }
  } else {
    //   无白名单，没有登录只能进入登录界面
    next('/login') // 否则全部重定向到登录页
    NProgress.done() // 结束进度条
  }
})

router.afterEach(() => {
  NProgress.done()
})
