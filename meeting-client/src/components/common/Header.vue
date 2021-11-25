<template>
  <div>
    <div class="header">
      <div>
        <h2>{{ role == "admin" ? "会议室预约管理系统" : "会议室预约系统" }}</h2>
      </div>
      <div class="right">
        <div class="pr-1" @click="layout()">
          <i class="el-icon-switch-button layout pr-2">退出登录</i>
        </div>
        <div @click="drawer= true" class="cursor ">
           <div class="pr-1">个人中心</div>
        <img
          class="avagr"
          :src="info.u_img"
          alt=""
        />
        </div>
        <div><span class="pl-1"></span><span>{{account}}</span></div>
      </div>
    </div>
    <el-drawer
      title="我的个人主页"
      size="25%"
      :visible.sync="drawer"
      :direction="direction"
    >
     <img
          class="avagr1"
          :src="info.u_img"
          alt=""
        />
        <el-row type="flex" justify="center" >
          <el-upload
            :action="host + '/users/uploads'"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="upload"
            accept="image/jpeg,image.jpg,image/png"
            name="pic"
            ref="my-upload"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-row>
      <el-dialog :visible.sync="dialogVisible">
        <div class="uimg">
           <img
          class="avagr"
          :src="info.u_img"
          alt=""
        />
        </div>
      </el-dialog>
       <div>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="info.account">
              <template slot="prepend">账号</template>
            </el-input>
          </el-col>
        </el-row>
      <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="info.pwd" show-password>
              <template slot="prepend">密码</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="info.phone">
              <template slot="prepend">电话</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row v-show="role=='user'" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="info.email">
              <template slot="prepend">邮箱</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row v-show="role=='user'" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="info.post">
              <template slot="prepend">岗位</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row v-show="role=='user'" type="flex" class="row-bg deparment" justify="center">
          <el-col :span="3">
            <el-button>部门</el-button>
          </el-col>
          <el-col :span="19" class="deparment">
            <el-select v-model="info.deparment" clearable placeholder="请选择部门">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row v-show="role=='user'" type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="info.name">
              <template slot="prepend">姓名</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-radio v-model="info.gender" label="男">男</el-radio>
            <el-radio v-model="info.gender" label="女">女</el-radio>
          </el-col>
        </el-row>
      </div>
    
      <div class="mt-3">
        <el-button type="success" round @click="submit()">保 存</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios'
import host1 from "../../../config/api"
export default {
  name: "Header",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      role:'',
      account:'',
      uid:'',
      host:host1.api,
      u_img:'',
      info:'',
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
    };
  },
  watch:{
    drawer(a){
  
    }
  },
  mounted() {
    this.host=host1.api
    var isLogin = JSON.parse(sessionStorage.getItem("isLogin"))
   this.role = isLogin.role
   this.account = isLogin.account
   this.uid= isLogin.uid
      this.getMyInfo()
    console.log(this.host)
  },
  methods: {
    upload: function (res, file, fileList) {
      this.$message({
        type: "success",
        message: "上传成功!",
      });
      
      this.u_img = res.imgUrl[0];
      console.log(res);
    },
    //删除刚上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //上传图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url);
    },
    //取消上传
    clearFiles: function () {
      this.dialogVisible = false;
      this.$refs["my-upload"].clearFiles();
    },
    submit(){
     if(this.role === "user"){
             if (this.info.account == "") {
        this.$message({
          message: "账号不能为空！",
          type: "warning",
        });
      }else if (this.info.pwd == "") {
        this.$message({
          message: "密码不能为空！",
          type: "warning",
        });
      }else if (this.info.phone == "") {
        this.$message({
          message: "手机号不能为空！",
          type: "warning",
        });
      } else if (this.info.gender == "") {
        this.$message({
          message: "性别不能为空！",
          type: "warning",
        });
      }else if (this.info.post == "") {
        this.$message({
          message: "岗位不能为空！",
          type: "warning",
        });
      } else if (this.info.deparment == "") {
        this.$message({
          message: "部门不能为空！",
          type: "warning",
        });
      } else if (this.info.email == "") {
        this.$message({
          message: "邮箱不能为空！",
          type: "warning",
        });
      }else if (this.info.name == "") {
        this.$message({
          message: "姓名不能为空！",
          type: "warning",
        });
      }else{
        this.$confirm("修改用户信息, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
        customClass: "messageBox",
      })
        .then(() => {
          axios
            .post("users/updateMyinfo", {
              info:this.info,
              u_img:this.u_img==''?this.u_img:this.u_img
            })
            .then((res) =>{
              if (res.data.flag === false) {
                this.$message({
                  type: "info",
                  message: res.data.msg,
                });
              } else {
                 this.getMyInfo()
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
              }
            })
            .catch((error)=> {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加",
          });
        });
        }
     }else{
 if (this.info.account == "") {
        this.$message({
          message: "账号不能为空！",
          type: "warning",
        });
      }else if (this.info.pwd == "") {
        this.$message({
          message: "密码不能为空！",
          type: "warning",
        });
      }else if (this.info.phone == "") {
        this.$message({
          message: "手机号不能为空！",
          type: "warning",
        });
      } else if (this.info.gender == "") {
        this.$message({
          message: "性别不能为空！",
          type: "warning",
        });
     }else{
       this.$confirm("修改用户信息, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
        customClass: "messageBox",
      })
        .then(() => {
          axios
            .post("admins/updateMyinfo", {
              info:this.info,
              u_img:this.u_img==''?this.info.u_img:this.u_img
            })
            .then((res) =>{
              if (res.data.flag === false) {
                this.$message({
                  type: "info",
                  message: res.data.msg,
                });
              } else {
                 this.getMyInfo()
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
              }
            })
            .catch((error)=> {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加",
          });
        });
     }
     }
    },
    layout() {
      this.$confirm("你确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出登录!",
          });
          sessionStorage.removeItem("isLogin");
          window.location = "#/login";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    getMyInfo() {
      if (this.uid) {
        if (this.role === "admin") {
          axios
            .post("admins/getMyInfo", {
              aid: this.uid,
            })
            .then((res) => {
              if (res.data.flag) {
                console.log(res.data.data[0])
                this.info=res.data.data[0]
              } else {
                this.u_img =
                  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
              }
              console.log(res.data.data[0]);
            })
            .catch(function (error) {
              console.log(error);
            });
        }else{
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
      }
    },
  },
};
</script>
<style>
.header {
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
  position: fixed;
  left: 0;
  width: 100vw;
  height: 70px;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgb(29, 29, 29);
  z-index: 999;
  padding: 0 30px;
  color: #fff;
}
.logo {
  width: 100px;
  height: 100%;
}
.avagr {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.avagr1 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
}
.pl-1 {
  padding-left: 10px;
}
.pr-1 {
  padding-right: 10px;
}
.layout {
  font-size: 16px;
  cursor: pointer;
}
.el-upload{
  width: 60px;
  height: 60px;
  line-height: 60px;
}
.el-switch {
  margin-left: 10px;
}
.row-bg {
  padding: 2px 0;
  background-color: #f9fafc;
}
.deparment {
  padding-left: 15px;
  cursor: pointer;
}
.cursor{
  cursor: pointer;
  display: flex;
  flex-direction: row;
 align-items: center;
}
</style>
