import { createRouter, createWebHistory } from 'vue-router'

// 如何得到路由实例 createRouter()
// 如何设置路由模式 history
// history 模式 createWebHistory()
// hash 模式 createWebHashHistory()
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // 默认参数 '/' 路由的基础路由
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

console.log(import.meta)

export default router
