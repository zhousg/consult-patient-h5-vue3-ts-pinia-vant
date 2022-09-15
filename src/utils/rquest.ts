// 二次封装axios
import router from '@/router'
import { useUserStore } from '@/stores'
import axios, { type Method } from 'axios'
import { Toast } from 'vant'
// 1. axios的配置
// 1.1 创建一个新的axios实例，配置基准地址，配置响应超时时间
// 1.2 添加请求拦截器，在请求头携带token
// 1.3 添加响应拦截器，判断业务是否成功，剥离无效的数据，401错误拦截去登录页面(删除当前用户信息)，
const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // 修改config，比如：修改请求头
    // 获取token===>就是获取user
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 将来  axios.get()
// .then(res=>{ // res 就是后台的数据，之前的res.data })
// .catch(e=>{ // 200+10001这种情况，e就是res.data , 如果是状态吗的错误 401 403 404 e 就错误对象  })
instance.interceptors.response.use(
  (res) => {
    // status 是200是响应成功的，res.data.code 是10000业务成功
    // 如果不是 10000 呢，使用 vant 的轻提示，报错阻断程序
    if (res.data.code !== 10000) {
      Toast(res.data.message || '网络异常')
      return Promise.reject(res.data)
    }
    // 剥离无效数据
    return res.data
  },
  (err) => {
    // 请求报错，响应出错
    // 遇见401跳转登录
    // 1. 现在在 /user/patient 页面下，发起一个获取用户信息的请求，但是此时token失效
    // 2. 跳转登录页面，登录成功之后，需要跳转回 /user/patient 页面 （默认跳转 /user 首页）
    // vue2  $router 路由实例，提供路由相关函数操作  $route  路由相关信息，query params path 。。。
    if (err.response.status === 401) {
      // 需要删除用户信息
      const store = useUserStore()
      store.delUser()
      // /user/patient?id=1000
      // path  /user/patient  不带查询参数
      // fullPath  /user/patient?id=1000  完整路径
      // currentRoute 是一个 ref 创建的数据，需要.value
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }

    return Promise.reject(err)
  }
)

// obj = { name: 'jack', age: 100 }  obj['name'] ===> const name = 'name'  obj[name]

// 2. 请求工具函数
// 2.1 参数：url  method  submitData
// 2.2 返回：instance 调用接口的promise对象
// const request = (url: string, method: string, submitData: object) => {
//   return instance.request({
//     url,
//     method,
//     // 区分get和其他请求post
//     // get 提交数据，选项：params
//     // 其他请求post 提交数据，选项：data
//     [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
//   })
// }
type Data<T> = {
  code: string
  message: string
  data: T
}
const request = <T>(url: string, method: Method = 'get', submitData?: object) => {
  // 泛型的第二个参数，可以自定义响应数据类型
  return instance.request<T, Data<T>>({
    url,
    method,
    // 区分get和其他请求post
    // get 提交数据，选项：params
    // 其他请求post 提交数据，选项：data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export { baseURL, instance, request }
