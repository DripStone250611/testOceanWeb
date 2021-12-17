<template>
<el-card>
  <div style="margin-bottom: 30px;">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>联网设备</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <overview-tables/>

</el-card>
</template>

<script>
import { ArrowRight } from '@element-plus/icons-vue'
import OverviewTables from "../overview/OverviewTables";
export default {
  name: "devManager",
  components:{
    OverviewTables
  },
  setup(){
    return {
      ArrowRight
    }
  },
}


</script>

<style scoped>

</style>