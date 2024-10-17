import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '../../api/user'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    // 定义一个响应式的token变量
    const token = ref('')
    // 设置token的方法
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 移除token的方法
    const removeToken = () => {
      token.value = ''
    }

    // 定义一个响应式的user变量
    const user = ref({})
    // 获取用户信息的方法
    const getUser = async () => {
      // 只要调用这个方法 就发送请求获取数据
      const res = await userGetInfoService() // 请求获取数据
      user.value = res.data.data
    }

    // 设置用户信息的方法
    const setUser = (obj) => {
      user.value = obj
    }
    // 返回所有的方法和变量
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true // 开启pinia持久化
  }
)
