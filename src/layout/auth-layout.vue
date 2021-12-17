<template>
  <login/>
</template>

<script>
import Login from "../views/auth/login/login";
import * as echarts from 'echarts';
import 'echarts-gl';
import {markRaw, onBeforeMount, onMounted} from "vue";

export default {
  name: "AdminLayout",
  setup(){
  },
  components:{
    Login

},
}
</script>

<style scoped>
</style>