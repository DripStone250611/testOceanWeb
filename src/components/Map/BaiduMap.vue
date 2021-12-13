<template>
  <el-card body-style="height:280px;">
    <template #header>
      <div>
        <span>位置信息</span>
      </div>
    </template>
      <el-card id="map" title="Baidu Maps"></el-card>

  </el-card>
</template>

<script>
import BMap from 'BMap'
import {inject, ref, onMounted, watch} from "vue";

export default {
  name: "BaiduMap",
  setup(){
    const devAddress = inject('address')
    const lng = ref(0)
    const lat = ref(0)
    onMounted(()=>{
      const map = new BMap.Map('map',{mapType:BMAP_HYBRID_MAP})
      map.enableScrollWheelZoom();                               //启用滚轮放大缩小
      // 创建地址解析器实例
      const point = new BMap.Point(120.69477, 36.3673842)
      const myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(devAddress, function(point) {
        if (point) {
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMap.Marker(point));
        } else {
          alert("没有找到地址");
        }
      }, "青岛市");
      map.addEventListener("mousemove",function(e){
        lng.value = e.point.lng;
        lat.value = e.point.lat;
        document.getElementById('span1').innerHTML = e.point.lng;
        //document.getElementById('span2').innerHTML = e.point.lat;
      });
      function ZoomControl() {
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(20, 20)
      }
      //通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control();

      //自定义控件必须实现自己的initialize方法，并且将控件的DOM元素返回
      //在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中
      ZoomControl.prototype.initialize = function(map) {
        //创建一个dom元素
        const div = document.createElement('div');
        //添加文字说明
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        span1.id = 'span1';
        span2.id = 'span2';
        span1.style.display = "inline-block"
        span2.style.display = "inline-block"
        //span1.appendChild(document.createTextNode("{{lng.value}}"));
        //span2.appendChild(document.createTextNode("{{lat}}"));
        div.appendChild(span1);
        div.appendChild(span2);
        // 设置样式
        div.style.cursor = "default";
        div.style.padding = "7px 10px";
        //div.style.boxShadow = "0 2px 6px 0 rgba(27, 142, 236, 0.5)";
        div.style.borderRadius = "5px";
        div.style.backgroundColor = "white";

        map.getContainer().appendChild(div);
        // 将DOM元素返回
        return div;
      }
      //创建控件元素
      var myZoomCtrl = new ZoomControl();
      //添加到地图中
      map.addControl(myZoomCtrl);
    })



    return {
      devAddress,
      lng,
      lat
    }
  },
  mounted(){

  }

}

</script>

<style scoped>

#map{
  width:100%;
  height:100%;
}


</style>

<style>
.anchorBL{display:none;}
</style>