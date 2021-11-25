<template>
  <div class="con">
    <el-row
      type="flex"
      class="row-bg"
      style="margin-top:0px; margin-bottom: 20px"
      justify="space-between"
     
    >  
      <el-col :span="18">
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="10">
          <el-input
            type="text"
            size="15"
            placeholder="请输入用户ID或昵称"
            v-model="keyWord"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              v-model="keyWord"
              @click="search()"
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
      </el-row>
      </el-col>
      <el-col  :span="4" style="margin-top:10px">
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-plus"
          @click="clickAdd()"
        ></el-button>
      </el-col>
    </el-row>
    <el-table :data="adminInfo" height="400" style="width: 100%" border>
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column prop="aid" label="管理员ID" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账 号"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="phone" align="center" label="电话">
      </el-table-column>
      <el-table-column prop="gender" align="center" label="性别">
      </el-table-column>
      <el-table-column width="200" align="center" label="操作">
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
              @click="del(scope.row.aid)"
            ></el-button>
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
      title="编辑管理员信息"
      :visible.sync="dialogVisible1"
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
            <el-radio v-model="gender" label="1">男</el-radio>
            <el-radio v-model="gender" label="2">女</el-radio>
          </el-col>
        </el-row>
      </div>
      <div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="updateAdmin()">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <!--添加管理员信息-->
    <el-dialog
      title="添加管理员账号"
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
            <el-radio v-model="gender" label="1">男</el-radio>
            <el-radio v-model="gender" label="2">女</el-radio>
          </el-col>
        </el-row>
      </div>
      <div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAdmin()">确 定</el-button>
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
      adminInfo: [],
      pageSize: 5, //每页条数
      totalCount: null, //总页数
      currentPage: 1, //当前页数
      keyWord: "",
      value1: true,
      value2: true,
      dialogVisible: false,
      dialogVisible1: false,
      account: "ertert",
      pwd: "",
      phone: "",
      gender: "1",
      aid: "",
    };
  },
  watch: {
    pageIndex() {
      this.getAdminInfo();
    },
  },
  mounted: function () {
    this.getAdminInfo();
  },
  methods: {
    //更新数据
    refresh(){
      this.getAdminInfo()
    },
    clickAdd: function () {
      this.account = "";
      this.pwd = "";
      this.gender = "";
      this.phone = "";
      this.dialogVisible = true;
    },
    //添加管理员
    addAdmin: function () {
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
      }else {
        this.dialogVisible = true;
      this.$confirm("添加管理员, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
        customClass: "messageBox",
      })
        .then(() => {
          var that = this;
          if (that.gender == 1) {
            var gender = "男";
          } else {
            var gender = "女";
          }
          axios
            .post("admins/addAdmin", {
              account: that.account,
              pwd: that.pwd,
              phone: that.phone,
              gender: gender,
            })
            .then(function (res) {
              if (res.data.flag === false) {
                that.$message({
                  type: "info",
                  message: res.data.msg,
                });
              } else {
                that.getAdminInfo();
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
          setTimeout(() => {
            this.dialogVisible = false;
          }, 1000);
        });
      }
    },
    edit: function (row) {
      this.dialogVisible1 = true;
      this.account = row.account;
      this.pwd = row.pwd;
      this.phone = row.phone;
      this.aid = row.aid;
      if (row.gender == "男") {
        this.gender = "1";
      } else {
        this.gender = "2";
      }
    },

    //提交修改管理员信息
    updateAdmin: function () {
      this.dialogVisible1 = true;
      this.$confirm("修改管理员, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
        customClass: "messageBox",
      })
        .then(() => {
          var that = this;
          if (that.gender == 1) {
            var gender = "男";
          } else {
            var gender = "女";
          }
          axios
            .post("admins/update", {
              account: that.account,
              pwd: that.pwd,
              phone: that.phone,
              gender: gender,
              aid: that.aid,
            })
            .then(function (res) {
              if (res.data.flag === false) {
                that.$message({
                  type: "info",
                  message: res.data.msg,
                });
              } else {
                that.getAdminInfo();
                that.$message({
                  type: "success",
                  message: res.data.msg,
                });
                setTimeout(() => {
                  that.dialogVisible1 = false;
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
          setTimeout(() => {
            this.dialogVisible1 = false;
          }, 1000);
        });
    },
    //提示弹窗封装
    tip: function (type, msg) {
      this.$notify({
        type: type,
        message: msg,
        duration: 2000,
      });
    },
    //搜索管理员
    search: function () {
      if (this.keyWord == "") {
        this.tip("warning", "请输入搜索内容！");
      } else {
        axios
          .post("admins/search", {
            keyWord: this.keyWord,
          })
          .then((res) => {
            if (res.data.flag === false) {
              this.tip("error", res.data.msg);
            } else {
              this.adminInfo = res.data.data;
              this.totalCount = 1;
              this.pagerCount = 1;
              console.log(res.data.data);
              // console.log(that.totalCount)
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
      this.getAdminInfo();
    },
    //获取管理员列表信息
    getAdminInfo: function () {
      var that = this;
      axios
        .post("admins/getAdmins", {
          currentPage: that.currentPage,
          pageSize: that.pageSize,
        })
        .then(function (res) {
          if (res.data.flag === false) {
            alert("fail");
          } else {
            that.adminInfo = res.data.data;
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

    //删除管理员
    del(aid) {
      this.$confirm("删除用户, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
      })
        .then(() => {
          var that = this;
          axios
            .post("admins/del", {
              aid: aid,
            })
            .then(function (res) {
              if (res.data.flag === false) {
                that.$message({
                  type: "info",
                  message: "删除失败",
                });
              } else {
                that.getAdminInfo();
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
.messageBox {
  z-index: 9999 !important;
}
</style>
