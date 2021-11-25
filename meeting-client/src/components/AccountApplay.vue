<template>
  <div class="container">
    <div class="lg-con">
      <div class="form-ground">
        <div class="form">
          <h2>账号申请</h2>
          <el-form @submit.native.prevent label-width="50px" size="small">
            <el-form-item label="账 号">
              <el-input v-model="account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密 码">
              <el-input
                type="password"
                v-model="pwd"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓 名">
              <el-input v-model="name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手 机">
              <el-input
                :class="!checkPhone ? 'border-red' : ''"
                v-model="phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮 箱">
              <el-input
                :class="!checkEmail ? 'border-red' : ''"
                v-model="email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="岗 位">
              <el-input
                class="input"
                v-model="post"
                placeholder="请输入岗位"
              ></el-input>
            </el-form-item>
            <el-form-item label="性 别">
              <el-radio v-model="radio" label="男">男</el-radio>
              <el-radio v-model="radio" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="部 门">
              <el-select v-model="deparment" clearable placeholder="请选择部门">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <div class="btn">
                <el-row :gutter="20">
                  <el-col>
                    <el-button
                      type="primary"
                      @click="submit()"
                      size="medium"
                      round
                      >提交申请</el-button
                    >
                  </el-col>
                </el-row>
              </div>
               <div class="mt-2 text-left cursor" @click="toLogin()"><h4>已有账号？去登陆</h4></div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      showAlert: false,
      radio: "",
      account: "",
      pwd: "",
      phone: "",
      email: "",
      gender: "",
      post: "",
      name: "",
      checkPhone: true,
      checkEmail: true,
      options: [
        {
          value: "人力资源部",
          label: "人力资源部",
        },
        {
          value: "财务部",
          label: "财务部",
        },
        {
          value: "公关部",
          label: "公关部",
        },
        {
          value: "融资部",
          label: "融资部",
        },
        {
          value: "设计部",
          label: "设计部",
        },
        {
          value: "预算部",
          label: "预算部",
        },
        {
          value: "工程部",
          label: "工程部",
        },
        {
          value: "策划部",
          label: "策划部",
        },
        {
          value: "营销部",
          label: "营销部",
        },
        {
          value: "综合部",
          label: "综合部",
        },
      ],
      deparment: "",
    };
  },
  watch: {
    phone(phone) {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
        this.checkPhone = false;
      } else {
        this.checkPhone = true;
        console.log("yes");
      }
    },
    email(email) {
      if (!/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(email)) {
        this.checkEmail = false;
      } else {
        this.checkEmail = true;
      }
    },
  },
  methods: {
    toLogin(){
      window.location = "#/login"
    },
    submit: function () {
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
      } else if (this.name == "") {
        this.$message({
          message: "姓名不能为空！",
          type: "warning",
        });
      } else if (this.phone == "") {
        this.$message({
          message: "手机号不能为空！",
          type: "warning",
        });
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        this.$message({
          message: "手机号格式不正确！",
          type: "warning",
        });
      } else if (this.email == "") {
        this.$message({
          message: "邮箱不能为空！",
          type: "warning",
        });
      } else if (
        !/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(this.email)
      ) {
        this.$message({
          message: "邮箱格式不正确！",
          type: "warning",
        });
      } else if (this.post == "") {
        this.$message({
          message: "岗位不能为空！",
          type: "warning",
        });
      } else if (this.radio == "") {
        this.$message({
          message: "性别不能为空！",
          type: "warning",
        });
      } else if (this.deparment == "") {
        this.$message({
          message: "部门不能为空！",
          type: "warning",
        });
      } else {
        this.$confirm("申请用户, 是否继续?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          lockScroll: false,
          type: "warning",
        })
          .then(() => {
            var that = this;
            axios
              .post("users/register", {
                account: this.account,
                pwd: this.pwd,
                phone: this.phone,
                deparment: this.deparment,
                name: this.name,
                gender: this.radio,
                email: this.email,
                post: this.post,
              })
              .then(function (res) {
                if (res.data.flag === false) {
                  that.$message.error(res.data.msg);
                } else {
                  that.$message({
                    message: "申请成功！等待管理员审核",
                    type: "success",
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(() => {
            that.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.container {
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#fffeff, #d7fffe);
  justify-content: center;
  position: relative;
  align-items: center;
}
.lg-con {
  width: 500px;
  height: 100vh;
  background: linear-gradient(#afecf7, #d5ecd4, #aee8f0);
  border-radius: 20px;
  opacity: 0.8;
  justify-content: center;
  position: relative;
  align-items: center;
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  text-align: center;
}
.form {
  width: 400px;
  margin: 0 auto;
  padding: 50px;
}
.toRegister {
  cursor: pointer;
  font-size: 20px;
}
.f-2x {
  font-size: 20px;
}
.border-red {
  border: 2px solid red;
  border-radius: 5px;
  cursor: pointer;
}
.cursor{
  cursor: pointer;
}
</style>