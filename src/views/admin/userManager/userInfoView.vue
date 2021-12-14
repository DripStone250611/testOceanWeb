<template>
  <el-card>
    <template #header>
      <div>
        <span>用户信息</span>
      </div>
    </template>
    <div>
      <el-form label-width="120px">
        <el-form-item label="用户名">
          <el-input disabled v-model="userInfo['account']"></el-input>
        </el-form-item>
        <el-form-item label="邮箱账号" >
          <el-input disabled v-model="userInfo['email']"></el-input>
          <el-button>修改</el-button>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input disabled v-model="userInfo['tel']"></el-input>
          <el-button>修改</el-button>
        </el-form-item>
        <el-form-item label="微信">
          <el-input disabled v-model="userInfo['wechatName']"></el-input>
          <el-button>绑定微信</el-button>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input  v-model="userInfo['company']"></el-input>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input  v-model="userInfo['address']"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="userInfo['remark']"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="editUserInfo">提交</el-button>
  </el-card>

</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "userInfoView",
  setup(){
    const store = useStore()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })

    const userInfo = ref({})
    const userInfoArr = [
        'account', 'email', 'tel','wechatName','company','address','remark'
    ]
    axios({
      url: 'https://openapi.mp.usr.cn/usrCloud/user/getUser',
      method: 'post',
      data: JSON.stringify({
        "account":store.state.account,
        "token":store.state.token
      }),
      headers:
          {
            'Content-Type': 'application/json'
          }
    }).then((resData)=>{
      userInfoArr.forEach((item)=>{
        userInfo.value[item] = resData.data.data[item]
      })
    })

    function editUserInfo(){
      axios({
        url: 'https://openapi.mp.usr.cn/usrCloud/user/editUser',
        method: 'post',
        data: JSON.stringify({
          "account":store.state.account,
          "token":store.state.token,
          "company":userInfo.value.company,
          "address":userInfo.value.address,
          "remark":userInfo.value.remark
        }),
        headers:
            {
              'Content-Type': 'application/json'
            }
      }).then((resData)=>{
        const status = resData.data.status
        switch (status){
          case 0:
            alert("success!!!");
            location.reload()
            break;
          default:
            alert("error!")
            break;
        }
    })
    }
    return{
      userInfo,
      editUserInfo
    }
  }
}
</script>

<style scoped>

</style>