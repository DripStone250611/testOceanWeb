<template>
  <el-card body-style="height:280px;">
    <template #header>
      <div>
        <span>位置信息</span>
      </div>
    </template>
      <el-card id="map"></el-card>

  </el-card>
</template>

<script>
import BMap from 'BMap'
import {inject, onMounted} from "vue";

export default {
  name: "BaiduMap",
  setup(){
    const devAddress = inject('address')

    onMounted(()=>{
      const map = new BMap.Map('map',{mapType:BMAP_HYBRID_MAP})
      map.enableScrollWheelZoom();                               //启用滚轮放大缩小
      // 创建地址解析器实例
      const point = new BMap.Point(120.69477, 36.3673842)


      function setPlace(value){
        function myFun(){
          map.clearOverlays();
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(pp, 10);
          map.addOverlay(new BMap.Marker(pp));
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(value);
      }
      setPlace(devAddress);

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
        const span1 = document.createElement('div');
        const span2 = document.createElement('div');
        span1.id = 'span1';
        span2.id = 'span2';
;
        div.appendChild(span1);
        div.appendChild(span2);
        // 设置样式
        div.style.cursor = "default";
        div.style.padding = "7px 10px";
        div.style.boxShadow = "0 2px 6px 0 rgba(27, 142, 236, 0.5)";
        div.style.borderRadius = "5px";
        div.style.background = "rgba(255, 255, 255, 0.7)";
        //div.style.backgroundColor = "white";

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
    }
  },
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