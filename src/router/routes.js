const BaseLayout = () => import('@/layout/index.vue');

// 所有权限通用路由
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            hidden: true,
        }
    },
    {
        path: '/',
        component: BaseLayout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: '控制台',
                    icon: 'icon-airplay',
                    only: true,
                    affix: true
                }
            },
        ]
    },
    // {
    //     path: '/message',
    //     component: Layout,
    //     redirect: '/message/index',
    //     children: [
    //         {
    //             path: '/message/index',
    //             component: () => import('@/views/message/index.vue'),
    //             meta: {
    //                 title: '留言',
    //                 icon: 'el-icon-message',
    //                 only: true,
    //             }
    //         }
    //     ]
    // },
    {
        path: '/resources',
        component: BaseLayout,
        redirect: '/resources/image',
        meta: {
            title: '资源管理',
            icon: 'icon-qianbao'
        },
        children: [
            {
                path: '/resources/image',
                component: () => import('@/views/resources/image.vue'),
                meta: {
                    title: '图片管理',
                    icon: 'icon-tupian'
                }
            }
        ]
    },
    {
        path: '/article',
        component: BaseLayout,
        redirect: '/article/list',
        meta: {
            title: '文章管理',
            icon: 'icon-wenzhangguanli'
        },
        children: [
            {
                path: '/article/list',
                component: () => import('@/views/article/list.vue'),
                meta: {
                    title: '文章列表',
                    icon: 'icon-wenzhangliebiao',
                }
            },
            {
                path: '/article/classify',
                component: () => import('@/views/article/classify.vue'),
                meta: {
                    title: '文章分类',
                    icon: 'icon-wenzhangfenlei',
                }
            },
            {
                path: '/article/comment',
                component: () => import('@/views/article/comment.vue'),
                meta: {
                    title: '文章评论',
                    icon: 'icon-pinglun',
                }
            },
            {
                path: '/article/add',
                component: () => import('@/views/article/add.vue'),
                meta: {
                    title: '添加文章',
                    icon: 'icon-tianjiawenzhang'
                }
            }
        ]
    },
    {
        path: '/info',
        component: BaseLayout,
        meta: {
            title: '个人信息',
            hidden: true
        },
        children: [
            {
                path: '/info',
                component: () => import('@/views/info/index.vue'),
                meta: {
                    title: '个人信息',
                },
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
        meta: {
            title: 'Not Found',
            hidden: true,
        },
    },
];

// 异步挂载的路由
export const asyncRoutes = [
    {
        path: '/system',
        component: BaseLayout,
        redirect: '/system/siteConfig',
        meta: {
            title: '系统管理',
            icon: 'icon-setting'
        },
        children: [
            {
                path: '/system/siteConfig',
                component: () => import('@/views/system/siteConfig.vue'),
                meta: {
                    title: '站点配置',
                    icon: 'icon-wangzhanguanli',
                }
            },
            {
                path: '/system/user',
                component: () => import('@/views/system/user.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'icon-user',
                    roles: ['superAdmin']
                }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: {
            hidden: true,
        }
    },
];

