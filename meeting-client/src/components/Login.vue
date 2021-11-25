<template>
  <div class="container">
    <div class="lg-con">
      <div class="form-ground">
        <div class="form">
          <div class="mb-5"><h3>欢迎登录会议室预约系统</h3></div>
          <el-form @submit.native.prevent>
            <el-row :gutter="20">
              <el-col :span="3"
                ><img class="mima" src="../assets/icon/admin.png" alt=""
              /></el-col>
              <el-col :span="20"
                ><el-input
                  v-model="account"
                  type="text"
                  size="15"
                  placeholder="请输入账号"
                ></el-input
              ></el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="3"
                ><img class="mima" src="../assets/icon/mima.png" alt=""
              /></el-col>
              <el-col :span="20"
                ><el-input
                  v-model="pwd"
                  type="password"
                  size="15"
                  placeholder="请输入密码"
                ></el-input
              ></el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="3"
                ><img class="mima" src="../assets/icon/code.png" alt=""
              /></el-col>
              <el-col :span="12"
                ><el-input
                  v-model="inputCode"
                  type="text"
                  size="15"
                  placeholder="请输入验证码"
                ></el-input
              ></el-col>
              <el-col :span="6">
                <label class="code">
                  <div @click="refreshCode">
                    <admin-code
                      :identifyCode="identifyCode"
                      :contentWidth="120"
                      :contentHeight="40"
                      :fontSizeMin="40"
                      :v-model="code"
                    />
                  </div>
                  <input type="hidden" :value="this.identifyCode" id="code" />
                </label>
              </el-col>
            </el-row>

            <el-radio v-model="type" label="0">普通用户</el-radio>
            <el-radio v-model="type" label="1">管理员</el-radio>

            <div class="btn">
              <el-row :gutter="20">
                <el-button size="medium" type="primary" round @click="login()"
                  >登 录</el-button
                >
              </el-row>
                <el-row :gutter="20">
                <el-button size="medium" type="primary" round @click="toRegister()"
                  >还没有账号？去注册</el-button
                >
              </el-row>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import AdminCode from "@/components/Code.vue";
export default {
  data() {
    return {
      account: "",
      pwd: "",
      inputCode: "",
      pwd: "",
      code: "",
      type: "",
      alertTitle: "成功！",
      alertType: "success",
      showAlert: false,
      //生成验证码的字符范围
      identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
      //生成的验证码
      identifyCode: "",
      rg_lg: false,
      loading: true,
    };
  },
  account: "Login",
  components: {
    AdminCode,
  },
  watch: {},
  methods: {
    toRegister(){
      window.location = "#/account_applay"
    },
    toRg: function () {
      this.rg_lg = !this.rg_lg;
    },
    login: function () {
      var code = document.getElementById("code").value;
      if (this.account == "") {
        this.$message({
          message: "账号不能为空！",
          type: "warning",
        });
      } else if (this.pwd == "") {
        this.$message({
          message: "密码不能为空！",
          type: "warning",
        });
      } else if (this.type == "") {
        this.$message({
          message: "请选择登录分身！",
          type: "warning",
        });
      } else if (this.inputCode == "") {
        this.$message({
          message: "验证码不能为空！",
          type: "warning",
        });
      } else if (this.inputCode.toLowerCase() != code.toLowerCase()) {
        this.$message.error("验证码有误！");
        this.refreshCode();
      } else {
        const loading = this.$loading({
          lock: true,
          text: "登录中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        var that = this;
        if (this.type == 0) {
          axios
            .post("users/Login", {
              account: that.account,
              pwd: that.pwd,
            })
            .then(function (res) {
              if (res.data.flag === false) {
                that.$message.error(res.data.msg);
                loading.close();
              } else {
                setTimeout(() => {
                   loading.close();
                  sessionStorage.setItem(
                  "isLogin",
                  JSON.stringify({
                    role: "user",
                    account: that.account,
                    uid:res.data.uid
                  })
                );
                  that.$message({
                    message: "登录成功",
                    type: "success",
                  });
                   window.location = "#/index";
                }, 2000);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios
            .post("admins/Login", {
              account: that.account,
              pwd: that.pwd,
            })
            .then(function (res) {
              if (res.data.flag === false) {
                that.$message.error(res.data.msg);
                loading.close();
              } else {
                 setTimeout(() => {
                   loading.close();
                  sessionStorage.setItem(
                  "isLogin",
                  JSON.stringify({
                    role: "admin",
                    account: that.account,
                    uid:res.data.uid
                  })
                );
                  that.$message({
                    message: "登录成功",
                    type: "success",
                  });
                   window.location = "#/index";
                }, 1000);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    //生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //******生成验证码，l为生成验证码的长度******
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        //随机字符串拼接
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      //验证码文本
      console.log(this.identifyCode);
      return this.identifyCode; //返回验证码
    },
  },
  mounted() {
    this.identifyCode = this.makeCode(this.identifyCodes, 4);
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: linear-gradient(#fffeff, #d7fffe);
  justify-content: center;
  position: relative;
  align-items: center;
}
.lg-con {
  margin: 0 auto;
  width: 500px;
  height: 500px;
  background: linear-gradient(#afecf7, #d5ecd4, #aee8f0);
  border-radius: 20px;
  opacity: 0.8;
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  text-align: center;
}
.logo {
  margin: 0 auto;
}
.logo img {
  width: 100%;
  height: 100%;
}
.form-ground {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.mima {
  width: 38px;
  height: 38px;
  margin-right: 10px;
}
.form {
  width: 500px;
  /* border:1px solid red; */
  margin: 0 auto;
  padding: 50px;
}
.el-row {
  margin-bottom: 20px;
}
.el-button {
  text-align: center;
  width: 380px;
}
.btn {
  margin: 20px auto;
  width: 380px;
  /* border:1px solid red */
}
.alert {
  position: absolute;
  top: 280px;
}
.toRegister {
  cursor: pointer;
  font-size: 20px;
}
.el-radio {
  font-size: 45px;
}
</style>