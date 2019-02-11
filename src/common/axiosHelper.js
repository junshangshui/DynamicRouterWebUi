import axios from 'axios'
import { store } from '../store/store'
import router from '../router/router'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json;charset-utf-8'
  },
  responseType: 'json'
})

// http request 请求拦截
instance.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 响应拦截
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 以下是状态码不为200时候的错误处理
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权'
          // 清除token并跳转到登录页
          store.commit('logout')

          // 当前路由不是登录页面才跳转
          if (router.currentRoute.path !== 'login') {
            // 带查询参数，例如 /login?redirect=xxx
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.path }
            })
          }
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
      }
    }
    return Promise.reject(error)
  }
)

export default instance
