<template #default="scope">
  <el-card>
    <el-table
        ref="multipleTable"
        :data="infoShow"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="设备状态" width="120" >
        <template #default="scope">
          <el-tag v-if="infoShow[scope.$index].onlineStatus === 1" type="success">在线</el-tag>
          <el-tag v-if="infoShow[scope.$index].onlineStatus !== 1" type="info">离线</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="name" label="设备名称" width="120" />
      <el-table-column property="deviceId" label="SN" show-overflow-tooltip />
      <el-table-column property="productModelName" label="设备型号" show-overflow-tooltip />
      <el-table-column property="projectName" label="所属组织" show-overflow-tooltip />
      <el-table-column property="address" label="设备地址地址" show-overflow-tooltip />
      <el-table-column label="启用状态" >
        <template #default="scope">
          <el-tag v-if="infoShow[scope.$index].status === 1" type="success">已启用</el-tag>
          <el-tag v-if="infoShow[scope.$index].status !== 1" type="danger">已禁用</el-tag>

        </template>

      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="viewDeviceData(scope.$index)">
            数据查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="">
        <template #default="scope">
          <el-button size="mini" @click="editDevice(scope.$index)">
            设备编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import {useStore} from "vuex";
import {reactive, ref, watch} from "vue";
import {useRouter,useRoute} from "vue-router";

export default {
  name: "OverviewTables",
  setup()
  {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const infoShow = ref([])
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })
    if (route.name == 'overview'){
      watch(() => {
            store.state.infoDevsDetail.length
          },(oldVar, newVar) => {
            const infoDevsDetail = store.state.infoDevsDetail.slice()
            const devNum = store.state.infoDevsDetail.length
            let i = 0
            for (i;i<devNum;i++)
            {
              infoShow.value.push(Object.assign({
                'idx':i,
                'name':infoDevsDetail[i].device.name,
                'deviceId':infoDevsDetail[i].device.deviceId,
                'projectName':infoDevsDetail[i].device.projectName,
                'productModelName':infoDevsDetail[i].device.productModelName,
                'address':infoDevsDetail[i].device.address,
                'onlineStatus':infoDevsDetail[i].device.onlineStatus,
                'status':infoDevsDetail[i].device.status
              }))
            }
          },
          {
            deep:true
          }
      );
    }
    else{
      const infoDevsDetail = store.state.infoDevsDetail.slice()
      const devNum = store.state.infoDevsDetail.length
      let i = 0
      for (i;i<devNum;i++)
      {
        infoShow.value.push(Object.assign({
          'idx':i,
          'name':infoDevsDetail[i].device.name,
          'deviceId':infoDevsDetail[i].device.deviceId,
          'projectName':infoDevsDetail[i].device.projectName,
          'productModelName':infoDevsDetail[i].device.productModelName,
          'address':infoDevsDetail[i].device.address,
          'onlineStatus':infoDevsDetail[i].device.onlineStatus,
          'status':infoDevsDetail[i].device.status
        }))
      }
    }
    let multipleSelection=reactive([])


    function viewDeviceData(idx){
      router.push({name:'devDataView',query:{devIdx:idx}})
    }
    function editDevice(idx){
      router.push({name:'devedit',query:{devIdx:idx}})
    }
    function handleSelectionChange(val){
      multipleSelection = val
    }
    return{
      infoShow,
      multipleSelection,
      handleSelectionChange,
      viewDeviceData,
      editDevice
    }
  },
}
</script>

<style scoped>

</style>