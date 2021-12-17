<template>
  <el-card>
    <div style="margin-bottom: 30px;">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card>放一些统计图</el-card>
  </el-card>

</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
export default {
  name: "dataManager",
  setup(){
    return {
      ArrowRight
    }
  },
}
</script>

<style scoped>

</style>