import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

// 回顾：vue2的路由
// 1. import VueRouter from 'vue-router'
// 2. const router = new VueRouter({ routes: [ // 路由规制 ] })
// 3. 选择路由模式  hash  /#/user   history   /user

// 现在 vue3的路由
// 1. 创建路由实例 createRouter({// 配置对象})
// 2. 配置选项中 routes: [ // 路由规制 ]
// 3. createWebHistory 使用路由history模式
// 4. createWebHashHistory 使用路由hash模式
// 5. import.meta.env.BASE_URL  路由的基准路由  create-vue脚手架提供的数据（环境变量）

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/Login/index.vue'), meta: { title: '登录' } },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '我的' }
        }
      ]
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultIllness.vue'),
      meta: { title: '图文问诊' }
    },
    {
      path: '/consult/pay',
      component: () => import('@/views/Consult/ConsultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path: '/room',
      component: () => import('@/views/Room/index.vue'),
      meta: { title: '问诊室' }
    }
  ]
})

// 访问权限控制
router.beforeEach((to) => {
  NProgress.start()
  // 如果 return true 或啥也不写 就是放行
  // 拦截到某个页面，return '路由地址'
  const store = useUserStore()
  const whiteList = ['/login']
  // 需求：当你没有登录也就是没有token 且 你访问的不是登录页面  拦截到登录
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})

router.afterEach((to) => {
  // 修改标题
  document.title = `149优医问诊-${to.meta.title || ''}`
  NProgress.done()
})

export default router
