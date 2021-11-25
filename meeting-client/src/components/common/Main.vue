<template>
<div class="main">
    <div class="tabs">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item class="pathName">{{pathName}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{tabs}}</el-breadcrumb-item>
</el-breadcrumb>
    </div>
    <div class="content">
      <transition name="fade" mode="out-in">
        <div v-show="show" class="transition-box"><router-view></router-view></div>
      </transition>
    </div>
</div>
</template>


<script>
export default {
    name: 'Main',
    data() {
        return {
            pathName :'',
            tabs:'',
            show: false
        }
    },
    watch: {
    '$route': function(){
      this.pathName = this.$route.name.split(":")[0];
      this.tabs = this.$route.name.split(":")[1]
       sessionStorage.setItem(
            "tabsItem",
            JSON.stringify({
              pathName: this.$route.name.split(":")[0],
              tabs: this.$route.name.split(":")[1],
            })
        );
    }
  },
    mounted(){
        this.show = true
      const sessionTabs = JSON.parse(sessionStorage.getItem("tabsItem"));
    if(sessionTabs!==null){
    this.pathName = sessionTabs.pathName
    this.tabs = sessionTabs.tabs
     }
     
    },
    methods: {

    }
}
</script>


<style media="screen">
  .main{
      box-sizing:border-box;
      -moz-box-sizing:border-box; /* Firefox */
      -webkit-box-sizing:border-box; /* Safari */
      position: absolute !important;
      left:220px !important;
      top: 100px;
      width:100vw;
      height:83vh;
      background:rgb(255, 255, 255);
  }
  .tabs{
      position: fixed;
      left:200px;
      top:70px;
      padding-left:20px;
      width: 90vw;
      background: lightcyan;
      align-items: center;
      padding:20px;
      z-index: 9;
  }
  .content{
      margin:30px 0 0 0px;
      width:85vw;
      height:100vh;
      background: rgb(249, 255, 255);
      z-index: 9999;
  }
  .content::-webkit-scrollbar {
   width: 4px;
   background: -webkit-linear-gradient(top, #A1FFCE 20%,#FAFFD1 100%);
  }
  .pathName{
      font-weight: 900;
  }

</style>
