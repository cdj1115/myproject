import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
// eslint-disable-next-line no-unused-vars
const baseURL = 'http://big-event-vue-api-t.itheima.net'
// 创建axios
const instance = axios.create({
  // 1.基础地址，赶超时间
  baseURL,
  timeout: 10000
})

// 配置请求拦截器
// 请求拦截器 在发送请求之前处理一些业务
instance.interceptors.request.use(
  (config) => {
    // 2.携带token
    const useStore = useUserStore()
    // 获取用户Store中的token，如果存在token，则将其添加到请求的headers中
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  // 对请求错误做些什么
  (err) => Promise.reject(err)
)

// 响应拦截器 数据返回后 ，处理一些业务，如返回异常统一处理
instance.interceptors.response.use(
  (res) => {
    // 3.处理业务失败
    // 4.摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // 处理业务失败，给错误提示，抛出错误
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 5.处理401错误
    // 错误的特殊情况 => 权限不足 或 token 过期 => 拦截到登录页
    if (err.response?.status === 401) {
      router.push('/login')
    }

    //  错误的默认情况
    ElMessage.error(err.response.data.message || '服务异常')

    return Promise.reject(err)
  }
)
// 导出
export default instance
export { baseURL }
