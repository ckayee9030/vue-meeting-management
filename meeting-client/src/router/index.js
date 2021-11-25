import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import AccountApplay from '@/components/AccountApplay'
import Users from '@/components/admin/users/Users'
import Admins from '@/components/admin/users/admins'
import Meeting from '@/components/admin/meeting/Meeting'
import Reserve from '@/components/admin/reserve/Reserve'
import ExportTable from '@/components/admin/table/ExportTable'
import Echart from '@/components/admin/table/Echart' //这里是对应的文件路径 @表示src
import NotFound from '@/components/errorPage/404'
import MyRecord from '@/components/user/reserve/MyRecord'
import MyInfo from '@/components/user/myInfo/Info'
import Rooms from '@/components/user/rooms/Rooms'
import ToReserve from '@/components/user/rooms/ToReserve'

import Cookies from 'js-cookie'
Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/index',
            name: '系统首页',
            component: Index,
            meta: {
                requireAuth: true
            },
            children: [{
                    path: '/users',
                    name: '用户管理:用户列表',
                    component: Users,
                    meta: {
                        requireAuth: true,
                        role: ['admin']
                    }
                },
                {
                    path: '/admins',
                    name: '用户管理:管理员列表',
                    component: Admins,
                    meta: {
                        requireAuth: true,
                        role: ['admin']
                    }
                },
                {
                    path: '/meeting',
                    name: '会议室管理:会议室列表',
                    component: Meeting,
                    meta: {
                        requireAuth: true,
                        role: ['admin']
                    }

                },
                {
                    path: '/reserve',
                    name: '预约信息管理:预约信息列表',
                    component: Reserve,
                    meta: {
                        requireAuth: true,
                        role: ['admin']
                    }

                },
                {
                    path: '/exportExcel',
                    name: '报表管理:报表列表',
                    component: ExportTable,
                    meta: {
                        requireAuth: true,
                        role: ['admin']
                    }

                },
                {
                    path: '/echart',
                    name: '报表管理:数据库可视化',
                    component: Echart,
                    meta: {
                        requireAuth: true,
                        role: ['admin']
                    }

                },
                {
                    path: '/my_records',
                    name: '会议室预约情况:我的预约记录',
                    component: MyRecord,
                    meta: {
                        requireAuth: true,
                        role: ['user']
                    }

                },
                {
                    path: '/my_info',
                    name: '我的个人信息管理:我的主页',
                    component: MyInfo,
                    meta: {
                        requireAuth: true,
                        role: ['user']
                    }
                },
                {
                    path: '/rooms',
                    name: '会议室信息:会议室',
                    component: Rooms,
                    meta: {
                        requireAuth: true,
                        role: ['user']
                    }

                },
                {
                    path: '/to_reserve/:params',
                    name: '会议室信息:预约会议室',
                    component: ToReserve,
                    meta: {
                        requireAuth: true,
                        role: ['user']
                    }

                },
            ]
        },
        {
            path: '/login',
            name: "登录",
            component: Login,
        },
        {
            path: '/account_applay',
            name: "登录",
            component: AccountApplay,
        },
        {
            path: '/404',
            component: NotFound
        }
    ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    var isLogin = sessionStorage.getItem("isLogin")
    if (isLogin) {
        isLogin = JSON.parse(isLogin)
    }
    if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
        if (isLogin) { // vuex.state判断token是否存在
            next() // 已登录
        } else {
            next({
                path: '/login',
                //query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        if (isLogin) {
            next('/login')
        } else {
            next()
        }
    }
})
// router.beforeEach((to, from, next) => {
//         var isLogin = sessionStorage.getItem("isLogin")
//     //     if (isLogin) {
//     //         isLogin = JSON.parse(isLogin)
//     //     }
//         console.log(isLogin)
//         if (isLogin) { // vuex.state判断token是否存在
//             next() // 已登录
//         } else {
//             next({
//                 path: '/login',
//             })
//         }
//     })

export default router