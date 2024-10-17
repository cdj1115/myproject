<script setup>
// 引入 ref 函数，用于创建响应式数据
import { ref } from 'vue'
// 引入 Edit 和 Delete 图标
import { Edit, Delete } from '@element-plus/icons-vue'
// 引入获取文章分类列表和删除文章分类的接口
import { artGetChannelsService, artDelChannelService } from '../../api/article'
// 引入 ChannelEdit 组件
import ChannelEdit from './components/ChannelEdit.vue'
// 创建响应式数据，用于存储文章分类列表
const channelList = ref([])
// 创建响应式数据，用于控制加载状态
const loading = ref(false)
// 创建响应式数据，用于控制对话框的显示
const dialog = ref()

// 获取文章分类列表的函数
const getChannelList = async () => {
  // 发请求前 设置加载状态为 true
  loading.value = true
  // 调用接口获取文章分类列表
  const res = await artGetChannelsService()
  // 将获取到的数据赋值给 channelList
  channelList.value = res.data.data
  // 发请求后 设置加载状态为 false
  loading.value = false
}
getChannelList()

// 删除文章分类的函数
const onDelChannel = async (row) => {
  // 弹出确认框，询问用户是否确认删除
  await ElMessageBox.confirm('你确认要删除该分类么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  // 调用接口删除文章分类
  await artDelChannelService(row.id)
  // 弹出删除成功的提示
  ElMessage.success('删除成功')
  // 重新获取文章分类列表
  getChannelList()
}
// 编辑文章分类的函数
const onEditChannel = (row) => {
  // 打开对话框，并传入当前行的数据
  dialog.value.open(row)
  console.log(row)
}
// 添加文章分类的函数
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  // 当编辑或添加完成后 重新渲染页面
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row 就是 channelList 的一项， $index 下标 -->
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
