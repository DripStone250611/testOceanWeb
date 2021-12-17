<template>
  <el-dialog
      v-model="dialogVisible"
      title="地图"
      width="45%"
      :before-close="handleClose"
      @opened="mapInit()"
  >
    <div style="position: relative">
      <div id="map"></div>

      <div id="addInfo">
        <div id="span1"></div>
        <div id="span2"></div>
      </div>

      <div id="search">
        <div>
          <el-input
              placeholder="请输入检索信息"
              id="suggestId"
              v-model="searchAddress"
          >
            <template #append>
              <el-button :icon="Search" id="searchButton"></el-button>
            </template>
          </el-input>

        </div>
        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:300px;height:auto; display:none;"></div>
      </div>

      <div id="oprator">
        <span style="font-size: 15px;">详细地址：{{newAddress}}</span>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="saveAddress(),dialogVisible = false">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import BMap from 'BMap'
import {inject,toRef,ref} from 'vue'
import { Search } from '@element-plus/icons-vue'
export default {
  name: "dialogMap",
  props:[
      'originAddress'
  ],
  setup(props,context) {
    const dialogVisible = inject("isShow")
    const dialogMsg = inject("msg")
    const handleClose = (done) => {
      done()
    }
    const originAddress = toRef(props,'originAddress')
    const newAddress = ref('')
    const searchAddress = ref('')
    newAddress.value = originAddress.value;

    function saveAddress(){
      context.emit('newAddr', newAddress.value)
    }

    function mapInit() {
      const map = new BMap.Map('map',{mapType:BMAP_HYBRID_MAP})
      map.enableScrollWheelZoom();                               //启用滚轮放大缩小
      // 创建地址解析器实例
      const myGeo = new BMap.Geocoder();
      let point = new BMap.Point(120.69477, 36.3673842);
      const marker = new BMap.Marker(point);
      map.centerAndZoom(point, 10);

      //将传入组件的地址在地图上标注出来
      setPlace(newAddress.value);

      //跟踪鼠标点击事件，进行逆地址解析，并修改标注位置
      map.addEventListener("click",function(e){
        const pt = e.point;
        myGeo.getLocation(pt, function(rs){
          newAddress.value = rs.address;
        })
        marker.setPosition(e.point);
      });


      //搜索框智能提示
      const ac = new BMap.Autocomplete(
          {
            "input" : "suggestId"
            ,"location" : map
          }
      );
      let myValue;
      ac.addEventListener("onconfirm",function(e){
        const _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        newAddress.value = myValue;
        setPlace(myValue);
      });
      function setPlace(value){
        function myFun(){
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 10);
          marker.setPosition(pp);
          map.addOverlay(marker);    //添加标注
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(value);
      }

      document.getElementById('searchButton').addEventListener('click',function(e){
        myValue = searchAddress.value;
        newAddress.value = searchAddress.value;
        setPlace(myValue);
      });



      //左上角实时显示经纬度组件
      map.addEventListener("mousemove",function(e){
        if(e.point.lng >= 0){
          document.getElementById('span1').innerHTML = "经度：" + (e.point.lng).toFixed(5) + "E";
        }else{
          document.getElementById('span1').innerHTML = "经度：" + (-e.point.lng).toFixed(5) + "W";
        }
        if(e.point.lat >= 0){
          document.getElementById('span2').innerHTML = "纬度：" + e.point.lat.toFixed(5) + "N";
        }else{
          document.getElementById('span2').innerHTML = "纬度：" + (-e.point.lat).toFixed(5) + "S";
        }
      });

    }

    return {
      dialogVisible,
      dialogMsg,
      originAddress,
      newAddress,
      searchAddress,
      Search,
      saveAddress,
      mapInit,
      handleClose,
    }
  }
}


</script>

<style scoped>
#map{
  height: 330px;
  width: 100%;
}
#addInfo{
  position:absolute; top: 20px;
  left: 20px;
  cursor:default;
  padding:7px 10px;
  box-shadow:0 2px 6px 0 rgba(27, 142, 236, 0.5);
  border-radius:5px;
  background: rgba(255, 255, 255, 0.7);
}
#search{
  position:absolute; top: 20px;
  right: 20px;
  width:300px;
  display: table;
}
#oprator{
  background: #ddd;
  padding: 20px 20px 20px 20px;
  width: calc(100% - 40px);
}


</style>
<style>
.anchorBL{display:none;}
.tangram-suggestion-main{
  z-index: 4000;
}
</style>