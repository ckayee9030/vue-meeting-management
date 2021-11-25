<template>
  <div class="container">
      <Header/>
      <Aside :role="role"/>
      <Main/>
  </div>
</template>
<script>
import Header from '@/components/common/Header.vue';
import Aside from '@/components/common/Aside.vue';
import Main from '@/components/common/Main.vue';
export default {
  name: 'Index',
  components: {
            Header,
            Aside,
            Main
      },
  data(){
    return {
      role:'',
      account:'',
      uid:''
    }
  },
  mounted(){
   var isLogin = JSON.parse(sessionStorage.getItem("isLogin"))
   this.role = isLogin.role
   this.account = isLogin.account
   this.uid= isLogin.uid
   console.log(isLogin)
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .container{
  padding:0px 50px 0px 50px
} */
</style>
