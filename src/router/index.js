import { createRouter as createVueRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import { constantRoutes } from './routes';
import store from '@/store';
import { getToken } from '@/utils/auth';

NProgress.configure({
    trickleSpeed: 50,
    showSpinner: false
});

const createRouter = () => createVueRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
});

const router = createRouter();

// 权限白名单
const whiteList = ['/login'];

router.beforeEach(async (to) => {
    NProgress.start();

    const hasUser = store.getters.user;

    if (hasUser) {
        // 仓库有信息，表示以登录
        !to.meta.hidden && store.commit('tagsView/ADD_TAGS_VIEW', to);
        return true;
    } else {
        if (whiteList.includes(to.path)) {
            return true;
        } else {
            const hasToken = getToken();
            if (hasToken) {
                store.commit('user/SET_TOKEN', hasToken);
                // 使用token获取用户信息
                const resp = await store.dispatch('user/getInfo');
                if (resp) {
                    const accessRoutes = await store.dispatch('permission/generateRoutes', resp.roles);
                    // 添加动态路由
                    for (const route of accessRoutes) {
                        router.addRoute(route);
                    }
                    if (to.meta.roles && !to.meta.roles.some(item => resp.roles.includes(item))) {
                        // 无权限
                        return '/';
                    }
                    return to.fullPath;
                } else {
                    // token无效
                    await store.dispatch('user/logout');
                    return {
                        path: '/login',
                        query: {
                            redirect: to.path
                        }
                    };
                }
            } else {
                return {
                    path: '/login',
                    query: {
                        redirect: to.path
                    }
                };
            }
        }
    }
});

router.afterEach(to => {
    to.meta.title && (document.title = to.meta.title);

    NProgress.done();
});

/**
 * 重置路由
 */
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
