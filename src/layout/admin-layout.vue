<template>
  <el-container>
    <el-header >
      <NavBar></NavBar>
    </el-header>
    <el-container>
      <el-aside  class="aside">
        <side-bar/>
      </el-aside>
      <el-main style="background-color: #e4e7ed">
          <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import SideBar from "../components/SideBar/SideBar";
import Overview from "../views/admin/overview/Overview";
import NavBar from "../components/NavBar/NavBar";



export default {
  name: "AdminLayout",
  components:{
    SideBar,
    Overview,
    NavBar,
  },
  setup(){
  }
}
</script>

<style scoped>
.aside {
  width: 250px;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.el-header{
  background-color: #165184;
  position:relative;
}
.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}
.el-main {
  position: absolute;
  left: 250px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}


</style>