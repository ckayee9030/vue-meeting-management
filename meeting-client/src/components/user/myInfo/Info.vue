<template>
  <div class="con">
   <el-card class="box-card">
  <div slot="header" class="clearfix">
      <div>我的个人主页</div>
   
    <el-tooltip class="item" effect="dark" content="点击右上角头像可修改个人信息" placement="top-start">
    <el-button style="padding: 3px 0" type="text" >点击右上角头像可修改个人信息</el-button>
    </el-tooltip>
    
  </div>
  <div class="text item">
      <div>
    <span>头 像：</span>
 <img class="avagr1" :src="info.u_img?info.u_img:u_img" alt="" />
      </div>
        <div>
            <span>用户ID:</span>
            {{info.uid}}
        </div>
         <div>
            <span>注册时间:</span>
            {{info.registerTime}}
        </div>
         <div>
            <span>审核通过:</span>
            {{info.passeTime}}
        </div>
         <div>
            <span>账 号:</span>
            {{info.account}}
        </div>
        <div>
            <span>电 话:</span>
            {{info.phone}}
        </div>
        <div>
            <span>邮 箱:</span>
            {{info.email}}
        </div>
         <div>
            <span>姓 名:</span>
            {{info.name}}
        </div>
        <div>
            <span>性 别:</span>
            {{info.gender}}
        </div>
        <div>
            <span>部 门:</span>
            {{info.deparment}}
        </div>
        <div>
            <span>岗 位:</span>
            {{info.post}}
        </div>
  </div>
</el-card>
  </div>
</template>

<script>
import axios from "axios";
import host from "../../../../config/api";
export default {
  data() {
    return {
     info:'',
      u_img:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
     }
  },
  watch: {

  },
  mounted: function () {
var isLogin = JSON.parse(sessionStorage.getItem("isLogin"))
   this.role = isLogin.role
   this.account = isLogin.account
   this.uid = isLogin.uid
 this.getMyInfo()
  },
  methods: {
     getMyInfo() {
      if (this.uid) {
          axios.post('users/getMyInfo',{
                    uid:this.uid
                }).then((res)=>{
                  if(res.data.flag){
                    this.info=res.data.data[0]
                  } else{
                    this.u_img = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                  }
                   console.log(res.data)
                    }).catch((error)=>{
                  console.log(error)
            })   
      }
    },
  },
};
</script>

<style scoped>
.text {
    font-size: 18px;
  }

  .item {
    width:400px;
    margin:20px auto;
    text-align: left;
  }
.item div>span{
    font-weight: 600;
}
.item>div{
   padding-bottom: 10px;
}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.box-card {
    width: 480px;
    margin:0 auto
  }
</style>
