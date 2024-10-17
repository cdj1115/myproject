<script setup>
// 引入获取文章频道列表的接口
import { artGetChannelsService } from '@/api/article.js'
import { ref } from 'vue'

// 定义props，接收父组件传递的参数
defineProps({
  // modelValue可以是Number或String类型
  modelValue: {
    type: [Number, String]
  },
  // width是String类型
  width: {
    type: String
  }
})
// 定义emit，用于向父组件传递事件
const emit = defineEmits(['update:modelValue'])
// 定义一个ref，用于存储频道列表
const channelList = ref([])
// 定义一个异步函数，用于获取频道列表
const getChannelList = async () => {
  // 调用接口获取频道列表
  const res = await artGetChannelsService()
  // 将获取到的频道列表赋值给channelList
  channelList.value = res.data.data
}
// 调用获取频道列表的函数
getChannelList()
</script>

<template>
  <!-- label 展示给用户看的，value 收集起来提交给后台的 -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <!-- 遍历频道列表，生成el-option -->
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
