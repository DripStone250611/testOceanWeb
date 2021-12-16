<template>
  <el-card>
    <template #header>
      <div style="margin-bottom: 20px;">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item>设备管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/admin/devManager' }">联网设备</el-breadcrumb-item>
          <el-breadcrumb-item>设备编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="card-header">
        <span>修改设备</span>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="basicInfo"  style="height: 350px;">
          <div style="padding-bottom: 30px;">
            <span>基本信息</span>
          </div>
          <div style="width:400px;">
            <el-form label-width="150px">
              <el-form-item label="设备名称">
                <el-input v-model="devInfoShow['name']"></el-input>
              </el-form-item>
              <el-form-item label="所属组织">
                <el-input disabled model-value="欧海星物联网演示"></el-input>
              </el-form-item>
              <el-form-item label="设备ID">
                <el-input disabled v-model="devInfoShow['deviceId']"></el-input>
              </el-form-item>
              <el-form-item label="通讯密码">
                <el-input v-model="devInfoShow['pass']" placeholder="Please input password" show-password />
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height: 350px;">
          <div style="padding-bottom: 30px;">
            <span>设备配置</span>
          </div>
          <div style="width:400px;">
            <el-form label-width="150px">
              <el-form-item label="设备标签">

              </el-form-item>
              <el-form-item label="设备地图">
                <span v-text="devInfoShow['address']" style="padding-right: 30px;"></span>
                <el-button size="medium" color="#626aef" style="color: white" @click="openMap()">修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <dialogMap :originAddress="devInfoShow['address']"
               @newAddr="changeAddr"
    ></dialogMap>
    <div style="padding-top: 30px; text-align: center;">
      <el-button size="medium" color="#626aef" style="color: white" @click="subMitEdit(devInfoShow)">保存</el-button>
    </div>
  </el-card>
</template>

<script>
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {ref, provide} from "vue";
import axios from "axios";
import dialogMap from "./components/dialogMap.vue"
import { ArrowRight } from '@element-plus/icons-vue'

export default {
  name: "devEditor",
  components:{
    dialogMap,
  },
  setup(){

    const show = ref(false)
    const msg = ref("map")
    provide("isShow",show)
    provide("msg",msg)
    function openMap(){
      show.value = true
    }
    const changeAddr = (something) => {
      devInfoShow.value['address'] = something;
    }

    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })

    const devIdx = route.query.devIdx
    const infoDevsDetail = store.state.infoDevsDetail[devIdx].device
    const devInfoShow = ref({})
    const arrInfoShow = [
      'projectId','name', 'templateId','deviceId',
      'type','pass','funcCloud',
      'funcMonitor', 'isTransProtocol'
      ,'positionType','address', 'position'
    ]
    const arrInfoShowCN = [
        '组织 id','设备名称','设备模板 id',
        '设备的SN','设备类型','设备密码',
        '云组态开关','云监测开关','是否为透传协议设备',
        '定位类型','设备定位地址描述','设备定位经纬度'
    ]
    arrInfoShow.forEach((item)=>{
      devInfoShow.value[item] = infoDevsDetail[item]
    })
    function subMitEdit(postData){
      axios({
        url: 'https://openapi.mp.usr.cn/usrCloud/dev/editDevice',
        method: 'post',
        data: JSON.stringify({
          "relUserIds": [],
          "device":postData,
          "tags":[],
          "token":store.state.token
        }),
        headers:
            {
              'Content-Type': 'application/json'
            }
      }).then((res)=>{
        const status = res.data.status
        switch (status){
          case 0:
            alert("修改成功");
            router.push({name:'overview'})
            break;
          default:
            alert("修改失败")
            break
        }
      })
    }
    return{
      devInfoShow,
      arrInfoShowCN,
      ArrowRight,
      subMitEdit,
      openMap,
      changeAddr,
    }




  }
}
</script>

<style scoped>

</style>
<style>
.el-form-item__label {
  text-align: center;
}
</style>