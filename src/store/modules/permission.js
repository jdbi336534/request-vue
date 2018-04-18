import { asyncRouterMap, constantRouterMap } from '@/router';
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // 此data中就是后端返回的权限数据，根据权限数据，在此写过滤逻辑
        let accessedRouters = asyncRouterMap;
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  }
};
export default permission;
