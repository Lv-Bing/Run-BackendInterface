import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
import Full from '@/containers/Full'
import { Store } from 'vuex'
// 把下面的路由 作懒加载处理
const Login = () =>
    import( /* webpackChunkName: "users" */ '@/views/users/Login.vue')
const Register = () =>
    import( /* webpackChunkName: "users" */ '@/views/users/Register.vue')
const Dashboard = () =>
    import( /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue')
const Diagram = () =>
    import( /* webpackChunkName: "charts" */ '@/views/charts/Diagram.vue')
const Slider = () =>
    import( /* webpackChunkName: "dashboard" */ '@/views/charts/Slider.vue')
const Tables = () =>
    import( /* webpackChunkName: "tables" */ '@/views/tables/Tables.vue')
const List = () =>
    import( /* webpackChunkName: "tables" */ '@/views/tables/list/List.vue')
const Details = () =>
    import( /* webpackChunkName: "tables" */ '@/views/tables/details/Details.vue')
const Setting = () =>
    import( /* webpackChunkName: "tables" */ '@/views/setting/Setting.vue')
const NotFind = () =>
    import( /* webpackChunkName: "home" */ '@/views/404.vue')
const User = () =>
    import( /* webpackChunkName: "home" */ '@/views/user/User.vue')
const Power = () =>
    import( /* webpackChunkName: "home" */ '@/views/power/Power.vue')
const Good = () =>
    import( /* webpackChunkName: "home" */ '@/views/good/Good.vue')
const Question = () =>
    import( /* webpackChunkName: "home" */ '@/views/question/Question.vue')
const Sign = () =>
    import( /* webpackChunkName: "home" */ '@/views/sign/Sign.vue')
const Props = () =>
    import( /* webpackChunkName: "home" */ '@/views/props/Props.vue')
const Rule = () =>
    import( /* webpackChunkName: "home" */ '@/views/rule/Rule.vue')
const Gameuser = () =>
    import( /* webpackChunkName: "home" */ '@/views/gameuser/Gameuser.vue')
const Gametask = () =>
    import( /* webpackChunkName: "home" */ '@/views/gametask/Gametask.vue')
const Gamemode = () =>
    import( /* webpackChunkName: "home" */ '@/views/gamemode/Gamemode.vue')
const Gameskin = () =>
    import( /* webpackChunkName: "home" */ '@/views/gameskin/Gameskin.vue')
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Full',
        component: Full,
        meta: {
            breadcrumb: '首页',
            requireLogin: true
        },
        children: [{
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                breadcrumb: 'dashboard',
                title: 'dashboard',
                requireLogin: true
            }
        },

        {
            path: '/users',
            name: 'User',
            component: User,
            meta: {
                breadcrumb: '后台用户',
                title: '后台用户',
                requireLogin: true
            }
        },

        {
            path: '/sign',
            name: 'Sign',
            component: Sign,
            meta: {
                breadcrumb: '签到',
                title: '签到',
                requireLogin: true
            }
        },
        {
            path: '/props',
            name: 'Props',
            component: Props,
            meta: {
                breadcrumb: '道具',
                title: '道具',
                requireLogin: true
            }
        },

        {
            path: '/rule',
            name: 'Rule',
            component: Rule,
            meta: {
                breadcrumb: '规则',
                title: '规则',
                requireLogin: true
            }
        },

        {
            path: '/gameuser',
            name: 'Gameuser',
            component: Gameuser,
            meta: {
                breadcrumb: '游戏用户',
                title: '游戏用户',
                requireLogin: true
            }
        },

        {
            path: '/gametask',
            name: 'Gametask',
            component: Gametask,
            meta: {
                breadcrumb: '游戏任务',
                title: '游戏任务',
                requireLogin: true
            }
        },

        {
            path: '/gamemode',
            name: 'Gamemode',
            component: Gamemode,
            meta: {
                breadcrumb: '游戏模型',
                title: '游戏模型',
                requireLogin: true
            }
        },

        {
            path: '/gameskin',
            name: 'Gameskin',
            component: Gameskin,
            meta: {
                breadcrumb: '游戏皮肤',
                title: '游戏皮肤',
                requireLogin: true
            }
        },

        {
            path: '/power',
            name: 'Power',
            component: Power,
            meta: {
                breadcrumb: '用户权限',
                title: '用户权限',
                requireLogin: true
            }
        },

        {
            path: '/goods',
            name: 'Good',
            component: Good,
            meta: {
                breadcrumb: '商店',
                title: '商店',
                requireLogin: true
            }
        },

        {
            path: '/questions',
            name: 'Question',
            component: Question,
            meta: {
                breadcrumb: '题库',
                title: '题库',
                requireLogin: true
            }
        },


        {
            path: '/charts/diagram',
            name: 'Diagram',
            component: Diagram,
            meta: {
                breadcrumb: '图表一',
                title: 'Diagram',
                requireLogin: true
            }
        },
        {
            path: '/charts/slider',
            name: 'Slider',
            component: Slider,
            meta: {
                breadcrumb: '图表二',
                title: 'Slider',
                requireLogin: true
            }
        },
        {
            path: '/tables',
            redirect: '/tables/list',
            name: 'Tables',
            component: Tables,
            meta: {
                breadcrumb: '表格',
                requireLogin: true
            },
            children: [{
                path: '/tables/list',
                name: 'List',
                component: List,
                meta: {
                    title: 'list',
                    breadcrumb: '列表',
                    requireLogin: true
                }
            },
            {
                path: '/tables/details',
                name: 'Details',
                component: Details,
                meta: {
                    title: 'details',
                    breadcrumb: '详情',
                    requireLogin: true
                }
            }
            ]
        },
        {
            path: '/setting',
            name: 'Setting',
            component: Setting,
            meta: {
                breadcrumb: '设置',
                requireLogin: true
            },
        }
        ]
    },
    {
        path: '*',
        name: 'NotFind',
        component: NotFind,
        meta: {
            title: '404'
        }
    }
    ]
})

// // 页面刷新时，重新赋值token
// if (localStorage.getItem('token')) {
//     store.commit('BIND_LOGIN', localStorage.getItem('token'))
// }

// // 全局导航钩子
// router.beforeEach((to, from, next) => {
//     if (to.meta.title) { // 路由发生变化修改页面title
//         document.title = to.meta.title
//     }
//     if (to.meta.requireLogin) {
//         if (store.getters.token) {
//             if (Object.keys(from.query).length === 0) { // 判断路由来源是否有query，处理不是目的跳转的情况
//                 next()
//             } else {
//                 let redirect = from.query.redirect // 如果来源路由有query
//                 if (to.path === redirect) { // 避免 next 无限循环
//                     next()
//                 } else {
//                     next({ path: redirect }) // 跳转到目的路由
//                 }
//             }
//         } else {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     } else {
//         next()
//     }
// })

router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转

    if (to.path === '/login') return next()
        // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router