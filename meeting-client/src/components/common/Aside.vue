<template>
 <div>
<!--管理员--->
<el-menu  v-show="role=='admin'" default-active="" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-user-solid"></i>
      <span slot="title">用户信息管理</span>
    </template>
     <el-menu-item index="1-1"  @click="goTo('/users')">普通用户</el-menu-item>
     <el-menu-item index="1-2"  @click="goTo('/admins')">管理员用户</el-menu-item>
  </el-submenu>

  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-chat-line-square"></i>
      <span slot="title">会议室管理</span>
    </template>
    <el-menu-item index="2-1"  @click="goTo('/meeting')">会议室列表</el-menu-item>
  </el-submenu>

  <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-school"></i>
      <span slot="title">报表管理</span>
    </template>
    <el-menu-item index="3-1" @click="goTo('/echart')">数据可视化</el-menu-item>
    <el-menu-item index="3-2" @click="goTo('/exportExcel')">报表信息列表</el-menu-item>
  </el-submenu>

  <el-submenu index="4">
    <template slot="title">
      <i class="el-icon-document-copy"></i>
      <span slot="title">预约信息管理</span>
    </template>
    <el-menu-item index="4-1" @click="goTo('/reserve')">预约信息列表</el-menu-item>
  </el-submenu>
</el-menu>

<!--普通用户-->
<el-menu  v-show="role=='user'" default-active="" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-user-solid"></i>
      <span slot="title">我的个人信息管理</span>
    </template>
     <el-menu-item index="1-1"  @click="goTo('/my_info')">我的主页</el-menu-item>
  </el-submenu>

  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-s-comment"></i>
      <span slot="title">会议室信息</span>
    </template>
     <el-menu-item index="2-1"  @click="goTo('/rooms')">会议室</el-menu-item>
  </el-submenu>

  <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-chat-line-square"></i>
      <span slot="title">会议室预约情况</span>
    </template>
    <el-menu-item index="3-1"  @click="goTo('/my_records')">我的预约记录</el-menu-item>
  </el-submenu>
</el-menu>
 </div>
</template>
<script>
export default {
  name: 'Swiper',
   props: {
      role: {
          type: String,
          value:''
      }
   },
  data () {
    return {
      oldPath:'/index',
    }
  },
  mounted(){
  },
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goTo(path) {
          if(this.oldPath!==path){
            this.oldPath = path
            this.$router.replace(path);
          }
      },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    position: fixed;
    top:70px;
    left:0;
    width: 200px;
    height: 100vh;
    z-index: 99;
  }
  .el-submenu{
    text-align: left;
    font-weight: bold;
  }
  .el-submenu>span{
    font-size: 20px;
  }
  
  .el-menu-item{
   text-align: center !important;
   font-weight: normal;
  }
</style>
