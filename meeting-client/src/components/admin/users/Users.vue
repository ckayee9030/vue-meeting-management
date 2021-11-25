<template>
  <div class="con">
    <el-row
      type="flex"
      class="row-bg"
      style="margin-top: 0px; margin-bottom: 20px"
      justify="space-between"
    >
      <el-col :span="18">
        <el-row type="flex" class="row-bg" justify="start" align="middle">
          <el-col :span="13">
            <el-input
              type="text"
              size="20"
              placeholder="请输入用户ID、账号、手机号、邮箱、姓名进行搜索"
              v-model="keyWord"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                v-model="keyWord"
                @click="search(keyWord)"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              size="15"
              icon="el-icon-refresh"
              circle
              @click="refresh()"
            ></el-button>
          </el-col>
          <el-col :span="6" class="deparment">
            <el-select
              v-model="deparment"
              @change="selectSearch(deparment)"
              @clear="refresh()"
              clearable
              placeholder="请选择部门"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="deparment">
            <el-select
              v-model="passe"
              @change="selectSearch(passe)"
              @clear="refresh()"
              clearable
              placeholder="请选择审核状态"
            >
              <el-option
                v-for="item in switchs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="margin-top: 10px">
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-plus"
          @click="clickAdd()"
        ></el-button>
      </el-col>
    </el-row>
    <el-table :data="userInfo" height="400" style="width: 100%" border>
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column prop="account" label="账号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="手机号">
      </el-table-column>
      <el-table-column prop="email" align="center" label="邮箱">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center" width="180">
      </el-table-column>
      <el-table-column prop="deparment" align="center" label="部门">
      </el-table-column>
      <el-table-column width="300" align="center" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edit(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del(scope.row.uid)"
            ></el-button>
            <el-switch
              v-model="scope.row.isPasse"
              active-color="#13ce66"
              inactive-color="#ddd"
              :active-value="1"
              :inactive-value="0"
              active-text="通过"
              inactive-text="待审核"
              @change="isPasse(scope.row.uid, scope.row.isPasse)"
            >
            </el-switch>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--分頁-->
    <el-pagination
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="changePage"
    >
    </el-pagination>

    <!--修改管理員信息-->
    <el-dialog
      :title="add_update == 0 ? '添加用户信息' : '修改用户信息'"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
    >
      <div>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="account">
              <template slot="prepend">账号</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="pwd">
              <template slot="prepend">密码</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="phone">
              <template slot="prepend">电话</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="email">
              <template slot="prepend">邮箱</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="post">
              <template slot="prepend">岗位</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg deparment" justify="center">
          <el-col :span="3">
            <el-button>部门</el-button>
          </el-col>
          <el-col :span="20" class="deparment">
            <el-select v-model="deparment" clearable placeholder="请选择部门">
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

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="name">
              <template slot="prepend">姓名</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-radio v-model="gender" label="男">男</el-radio>
            <el-radio v-model="gender" label="女">女</el-radio>
          </el-col>
        </el-row>
      </div>
      <div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-show="add_update === 0" type="primary" @click="addUser()"
            >确 定</el-button
          >
          <el-button
            v-show="add_update === 1"
            type="primary"
            @click="updateUser()"
            >确 定</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userInfo: [],
      pageSize: 5, //每页条数
      totalCount: null, //总页数
      currentPage: 1, //当前页数
      keyWord: "",
      dialogVisible: false,
      account: "",
      pwd: "",
      phone: "",
      gender: "",
      uid: "",
      name: "",
      deparment: "",
      email: "",
      post: "",
      add_update: "",
      switchs:[
        {
          value: "0",
          label: "待审核",
        },
        {
          value: "1",
          label: "通过",
        },
      ],
      passe:'',
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
  watch: {
    pageIndex() {
      this.getUserInfo();
    },
  },
  mounted: function () {
    this.getUserInfo();
  },
  methods: {
    //更新数据
    refresh() {
      this.getUserInfo();
    },
    clickAdd: function () {
      this.add_update = 0;
      this.account = "";
      this.pwd = "";
      this.phone = "";
      this.uid = "";
      this.post = "";
      this.deparment = "";
      this.name = "";
      this.email = "";
      this.gender = "";
      this.dialogVisible = true;
    },
    //添加
    addUser: function () {
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
      } else if (this.手机号 == "") {
        this.$message({
          message: "手机号不能为空！",
          type: "warning",
        });
      } else if (this.gender == "") {
        this.$message({
          message: "性别不能为空！",
          type: "warning",
        });
      }else if (this.post == "") {
        this.$message({
          message: "岗位不能为空！",
          type: "warning",
        });
      } else if (this.deparment == "") {
        this.$message({
          message: "部门不能为空！",
          type: "warning",
        });
      } else if (this.email == "") {
        this.$message({
          message: "邮箱不能为空！",
          type: "warning",
        });
      }else if (this.name == "") {
        this.$message({
          message: "姓名不能为空！",
          type: "warning",
        });
      }else{
      this.$confirm("添加用户信息, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
        customClass: "messageBox",
      })
        .then(() => {
          var that = this;
          axios
            .post("users/register", {
              account: that.account,
              pwd: that.pwd,
              phone: that.phone,
              gender: that.gender,
              uid: that.uid,
              post: that.post,
              deparment: that.deparment,
              email: that.email,
              name: that.name,
            })
            .then(function (res) {
              if (res.data.flag === false) {
                that.$message({
                  type: "info",
                  message: res.data.msg,
                });
              } else {
                that.getUserInfo();
                that.$message({
                  type: "success",
                  message: res.data.msg,
                });
                setTimeout(() => {
                  that.dialogVisible = false;
                }, 1000);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加",
          });
            this.dialogVisible = false;
        });
      }
     
    },
    edit: function (row) {
      this.add_update = 1;
      this.dialogVisible = true;
      this.account = row.account;
      this.pwd = row.pwd;
      this.phone = row.phone;
      this.uid = row.uid;
      this.post = row.post;
      this.deparment = row.deparment;
      this.name = row.name;
      this.email = row.email;
      this.gender = row.gender;
    },

    //提交修改信息
    updateUser: function () {
      this.dialogVisible1 = true;
      this.$confirm("修改管理员, 是否继续?", "提示", {
        confirmButtonText: "确定修改",
        cancelButtonText: "取消修改",
        lockScroll: true,
        type: "warning",
      })
        .then(() => {
          var that = this;
          axios
            .post("users/update", {
              account: that.account,
              pwd: that.pwd,
              phone: that.phone,
              gender: that.gender,
              uid: that.uid,
              post: that.post,
              deparment: that.deparment,
              email: that.email,
              name: that.name,
            })
            .then(function (res) {
              if (res.data.flag === false) {
                that.$message({
                  type: "info",
                  message: res.data.msg,
                });
              } else {
                that.getUserInfo();
                that.$message({
                  type: "success",
                  message: res.data.msg,
                });
                setTimeout(() => {
                  that.dialogVisible = false;
                }, 1000);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    //是否屏蔽
    isPasse: function (uid, state) {
      var that = this;
      axios
        .post("users/updateState", {
          uid: uid,
          state: state,
        })
        .then(function (res) {
          if (state == 1) {
            that.$message({
              type: "success",
              message: "通过审核",
            });
          } else {
            that.$message({
              type: "success",
              message: "未通过审核",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //部门搜索
    selectSearch(word) {
      if(word){
         this.search(word);
        }
    },
    checkIspasse(word){
      if(word){
         this.search(word);
        }
      
    },
    //搜索
    search: function (word) {
      if (this.keyWord==""&&word=="") {
        this.$message({
          type: "warning",
          message: "请输入搜索内容！",
        });
      } else {
        var that = this
        axios
          .post("users/search", {
            keyWord: this.keyWord==''?word:this.keyWord,
            deparment:this.deparment,
            isPasse:this.passe==''?-1:this.passe,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          })
          .then((res) => {
            if (res.data.flag === false) {
              that.$message({
                type: "error",
                message: res.data.msg,
              });
            } else {
              this.userInfo = res.data.data;
              that.totalCount = res.data.data[0].totalCount;
              that.pagerCount = Math.ceil(
              res.data.data[0].totalCount / that.pageSize
            );
              console.log(res.data.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    //改变页面
    changePage: function (e) {
      this.currentPage = e;
      this.getUserInfo();
    },
    //获取列表信息
    getUserInfo: function () {
      var that = this;
      axios
        .post("users/getusers", {
          currentPage: that.currentPage,
          pageSize: that.pageSize,
        })
        .then(function (res) {
          if (res.data.flag === false) {
            alert("fail");
          } else {
            that.userInfo = res.data.data;
            that.totalCount = res.data.data[0].totalCount;
            that.pagerCount = Math.ceil(
              res.data.data[0].totalCount / that.pageSize
            );
            console.log(res.data.data);
            console.log(that.totalCount);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //删除
    del(uid) {
      this.$confirm("删除用户, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
      })
        .then(() => {
          var that = this;
          axios
            .post("users/delUser", {
              uid: uid,
            })
            .then(function (res) {
              if (res.data.flag === false) {
                that.$message({
                  type: "info",
                  message: "删除失败",
                });
              } else {
                that.getUserInfo();
                that.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-pagination {
  margin-top: 30px;
}
.el-switch {
  margin-left: 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.deparment {
  padding-left: 25px;
}
.messageBox {
  z-index: 9999 !important;
}
</style>
