<template>

  <el-menu  style="min-height: calc(100vh - 60px);"
            :default-active="route.name" background-color="#8AAA9F"
            active-text-color="#ffd04b" text-color="#fff"
            router
            class="el-menu-vertical"
            :collapse="isCollapse"
            :default-openeds="state.defaultOpen"
  >
    <template v-for="item in menuList" v-cloak>
      <template v-if="item.sub.length!==0">
        <el-sub-menu :index="item.id" :key="item.id">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span v-text="item.name"></span>
          </template>
          <el-menu-item-group v-for="sub in item.sub" :key="sub.componentName">
            <el-menu-item :index="sub.componentName" v-text="sub.name" style="padding-left: 60px;"></el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.id" :key="item.id" v-text="item.name">

        </el-menu-item>
      </template>
    </template>

  </el-menu>
</template>

<script>
import {defineComponent, inject, reactive, ref, watch} from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons'
import menuList from './menu-config'
import {useRoute} from "vue-router";

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    const isCollapse = ref(false)
    const route =useRoute()
    const state = reactive({
      defaultOpen: ['devManager','dataCenter'],
    })
    return {
      isCollapse,
      state,
      route,
      menuList:menuList
    }
  },
  methods:{
    clickTransRoute(){
      this.$router.push({name:'devhistorydata'})
    },
  },


})
</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.el-menu-vertical .el-sub-menu.is-active {
  background-color: rgb(231, 235, 240) !important;
}
.el-submenu__title:hover{
  background-color:rgb(3, 19, 33) !important;
}
.el-menu-vertical .el-sub-menu__title{
  font-size: 16px;
}
.el-menu-vertical .el-menu-item{
  font-size: 16px;
}



</style>
