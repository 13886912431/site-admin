import { asyncRoutes, constantRoutes } from '@/router/routes';

/**
 * 是否允许
 * @param roles 用户角色
 * @param route 路由
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.some(r => roles.includes(r));
    } else {
        return true;
    }
}

/**
 * 递归过滤异步路由
 * @param routes 异步路由
 * @param roles 用户角色
 */
function filterAsyncRoutes(routes, roles) {
    const result = [];
    if (!routes) return result;

    routes.forEach(route => {
        const temp = { ...route };
        if (hasPermission(roles, temp)) {
            temp.children = filterAsyncRoutes(temp.children, roles);
            result.push(temp);
        }
    });

    return result;
}

const state = {
    routes: constantRoutes
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = state.routes.concat(routes);
    },
    RESET_ROUTES: state => {
        state.routes = constantRoutes;
    },
};

const actions = {
    generateRoutes({ commit }, roles) {
        let accessedRoutes;
        if (roles.includes('superAdmin')) {
            accessedRoutes = asyncRoutes || [];
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        commit('SET_ROUTES', accessedRoutes);
        return accessedRoutes;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
