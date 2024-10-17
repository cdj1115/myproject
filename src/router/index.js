import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

// createRouter 创建路由实例
// 配置 history 模式
// 1.history 模式：createWebHistory       地址栏不带 #
// 2.hash模式：    createWebHashHistory   地址栏带 #

// console.log(import.meta.env.DEV)开发环境
// vite中的环境变量 import.meta.env.BASE_URL  就是vite.config.js 中的base配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 路由懒加载  异步组件写法
    // 登录页
    { path: '/login', component: () => import('../views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('../views/layout/LayoutContainer.vue'),
      // 如果访问到 / 则重定向到/article/manage
      redirect: '/article/manage',
      // 二级路由配置
      children: [
        {
          path: 'article/manage',
          component: () => import('@/views/article/ArtcleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArtcleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('../views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('../views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('../views/user/UserPassword.vue')
        }
      ]
    }
  ]
})
// 登录访问拦截 => 默认是直接放行的 未登录的用户是不能进入首页的
// 根据返回值决定，是放行还是拦截
// 返回值：
// 1. undefined / true  直接放行
// 2. false 拦回from的地址页面
// 3. 具体路径 或 路径对象  拦截到对应的地址
//    '/login'   { name: 'login' }
router.beforeEach((to) => {
  const useStore = useUserStore()
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
