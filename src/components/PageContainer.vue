<script setup>
// 接收父组件传递的title 属性
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <!-- 标题 -->
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 具名插槽 定制右侧按钮 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 内容 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
