<template>

  <el-card>
    <div style="margin-bottom: 30px;">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


      <el-row :gutter="30" style="margin-bottom: 30px;">
        <el-col :span="12">
          <el-card>
            <div id="chartDevOnlineStatus" class="main"/>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div id="chartDevProduct" class="main"/>
          </el-card>
        </el-col>
      </el-row>

        <el-row :gutter="30">
          <el-col :span="12">
            <el-card>
              <div id="chartDevAddress" class="main"/>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <div id="chartDevSlaves" class="main"/>
            </el-card>
          </el-col>
        </el-row>




    </el-card>


</template>

<script>
import * as echarts from 'echarts';
import {markRaw, onMounted} from "vue";
import {useStore} from "vuex";
  import { ArrowRight } from '@element-plus/icons-vue'
export default {
  name: "dataManager",
  setup(){
    let myChartDevOnline
    let myChartDevProduct
    let myChartDevAddress
    let myChartDevSlaves
    const store = useStore()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })
    const infoDevsDetail = store.state.infoDevsDetail
    const numDevs = infoDevsDetail.length
    let numOnlineDevs = 0
    let numSlaves = 0
    const numProductModel = {}
    const numAddress = {}
    const numDevSlaves ={}
    infoDevsDetail.forEach((item)=>{
      if (item.device.onlineStatus == 1){
        numOnlineDevs++
      }
      if (item.slaveTotal){
        numSlaves += item.slaveTotal
      }
      if(item.device.productModelName in numProductModel){
        numProductModel[item.device.productModelName] ++
      }
      else {
        numProductModel[item.device.productModelName] = 1
      }
      if(item.device.address in numAddress){
        numAddress[item.device.address] ++
      }
      else {
        numAddress[item.device.address] = 1
      }
      if(item.deviceSlaves){
        item.deviceSlaves.forEach((slave)=>{
          if(slave.slaveName in numDevSlaves){
            numDevSlaves[slave.slaveName] ++
          }
          else {
            numDevSlaves[slave.slaveName] = 1
          }
        })
      }
    })

    const optionDevOnline = {
      title: {
        text: '设备在线情况统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '设备在线情况统计',
          type: 'pie',
          radius: '50%',
          data: [
            { value: numOnlineDevs, name: '在线' },
            { value: numDevs-numOnlineDevs, name: '离线' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    const optionDevProduct = {
      title: {
        text: '设备型号统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '设备在线情况统计',
          type: 'pie',
          radius: '50%',
          data: [
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const optionAddress = {
      title: {
        text: '设备地理位置统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '设备在线情况统计',
          type: 'pie',
          radius: '50%',
          data: [
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const optionDevSlaves={
      title: {
        text: '设备从机信息统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '设备从机信息统计',
          type: 'pie',
          radius: '50%',
          data: [
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    for (let key in numProductModel){
      optionDevProduct.series[0].data.push({
        value:numProductModel[key],
        name : key
      })
    }
    for (let key in numAddress){
      optionAddress.series[0].data.push({
        value:numAddress[key],
        name : key
      })
    }
    for (let key in numDevSlaves){
      optionDevSlaves.series[0].data.push({
        value:numDevSlaves[key],
        name : key
      })
    }
    onMounted(()=>{
      myChartDevOnline = markRaw(echarts.init(document.getElementById("chartDevOnlineStatus"))) ;
      myChartDevOnline.setOption(optionDevOnline);
      myChartDevProduct = markRaw(echarts.init(document.getElementById("chartDevProduct")))
      myChartDevProduct.setOption(optionDevProduct);
      myChartDevAddress = markRaw(echarts.init(document.getElementById("chartDevAddress")))
      myChartDevAddress.setOption(optionAddress)
      myChartDevSlaves = markRaw(echarts.init(document.getElementById("chartDevSlaves")))
      myChartDevSlaves.setOption(optionDevSlaves)
      window.addEventListener("resize",function(){
        if (myChartDevSlaves){
          myChartDevOnline.resize();
          myChartDevProduct.resize();
          myChartDevAddress.resize();
          myChartDevSlaves.resize()
        }
      });
    })
    return {
      ArrowRight
    }
  }

}
</script>

<style scoped>
.main{
  height: 400px;
  width: 500px;
}
</style>