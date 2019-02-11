import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '../store/store'
import Main from '@/components/Main'
import Login from '@/components/Login'
// import RoleManage from '@/views/RoleManage'
// import UserManage from '@/views/UserManage'
// import YuWen from '@/views/YuWen'
// import YingYu from '@/views/YingYu'
// import YingYuYuFa from '@/views/YingYuYuFa'
// import YingYuKouYu from '@/views/YingYuKouYu'
// import ShuXue from '@/views/ShuXue'
// import WuLi from '@/views/WuLi'
Vue.use(VueRouter)

var routes = [
  {
    path: '/',
    component: Main,
    meta: {
      requireAuth: true
    } // ,
  //   children: [
  //     {
  //       path: '/YuWen',
  //       name: '语文',
  //       component: YuWen,
  //       meta: {
  //         requireAuth: true
  //       },
  //       children: null
  //     },
  //     {
  //       path: '/YingYu',
  //       name: '英语',
  //       component: YingYu,
  //       meta: {
  //         requireAuth: true
  //       },
  //       children:
  //         [
  //           {
  //             path: '/YingYuYuFa',
  //             name: 'YingYuYuFa',
  //             component: YingYuYuFa,
  //             meta: {
  //               requireAuth: true
  //             }
  //           },
  //           {
  //             path: '/YingYuKouYu',
  //             name: 'YingYuKouYu',
  //             component: YingYuKouYu,
  //             meta: {
  //               requireAuth: true
  //             }
  //           }
  //         ]
  //     },
  //     {
  //       path: '/ShuXue',
  //       name: '数学',
  //       component: ShuXue,
  //       meta: {
  //         requireAuth: true
  //       },
  //       children: null
  //     },
  //     {
  //       path: '/WuLi',
  //       name: '物理',
  //       component: WuLi,
  //       meta: {
  //         requireAuth: true
  //       },
  //       children: null
  //     },
  //     {
  //       path: '/RoleManage',
  //       name: '角色管理',
  //       component: RoleManage,
  //       meta: {
  //         requireAuth: true
  //       },
  //       children: null
  //     },
  //     {
  //       path: '/UserManage',
  //       name: '用户管理',
  //       component: UserManage,
  //       meta: {
  //         requireAuth: true
  //       },
  //       children: null
  //     }
  //   ]
  },
  {
    path: '/Login',
    component: Login
  },
  { path: '*', redirect: '/' }
]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit('login', window.localStorage.getItem('token'))
}

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})
export default router
