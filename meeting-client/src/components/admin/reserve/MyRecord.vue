<template>
  <div class="con">
    <el-row
      type="flex"
      class="row-bg"
      style="margin-bottom: 20px"
      justify="space-between"
    >
      <el-col>
        <el-row type="flex" class="row-bg" justify="start" align="middle">
          <el-col class="deparment">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i>待参加</span>
                <el-table
                  :data="reserveInfo"
                  height="600"
                  style="width: 100%"
                  border
                >
                  <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="50"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="applicant"
                    label="申请人"
                    width="180"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="申请人数">
                  </el-table-column>
                  <el-table-column
                    prop="meetingTime"
                    align="center"
                    label="申请时间段"
                  >
                  </el-table-column>
                  <el-table-column align="center" label="状态">
                    <el-tag type="success">通过</el-tag>
                  </el-table-column>
                  <el-table-column width="300" align="center" label="操作">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button
                          type="primary"
                          icon="el-icon-postcard"
                          @click="edit(scope.row)"
                          >详情</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid)"
                        ></el-button>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              
              <el-tab-pane label="已参加">
                   <el-table
                  :data="reserveInfo"
                  height="600"
                  style="width: 100%"
                  border
                >
                  <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="50"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="applicant"
                    label="申请人"
                    width="180"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="申请人数">
                  </el-table-column>
                  <el-table-column
                    prop="meetingTime"
                    align="center"
                    label="申请时间段"
                  >
                  </el-table-column>
                  <el-table-column align="center" label="状态">
                    <el-tag type="success">通过</el-tag>
                  </el-table-column>
                  <el-table-column width="300" align="center" label="操作">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button
                          type="primary"
                          icon="el-icon-postcard"
                          @click="edit(scope.row)"
                          >详情</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid)"
                        ></el-button>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="待参加">
                   <el-table
                  :data="reserveInfo"
                  height="600"
                  style="width: 100%"
                  border
                >
                  <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="50"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="applicant"
                    label="申请人"
                    width="180"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="申请人数">
                  </el-table-column>
                  <el-table-column
                    prop="meetingTime"
                    align="center"
                    label="申请时间段"
                  >
                  </el-table-column>
                  <el-table-column align="center" label="状态">
                    <el-tag type="success">通过</el-tag>
                  </el-table-column>
                  <el-table-column width="300" align="center" label="操作">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button
                          type="primary"
                          icon="el-icon-postcard"
                          @click="edit(scope.row)"
                          >详情</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid)"
                        ></el-button>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="审核中">
                   <el-table
                  :data="reserveInfo"
                  height="600"
                  style="width: 100%"
                  border
                >
                  <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="50"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="applicant"
                    label="申请人"
                    width="180"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="申请人数">
                  </el-table-column>
                  <el-table-column
                    prop="meetingTime"
                    align="center"
                    label="申请时间段"
                  >
                  </el-table-column>
                  <el-table-column align="center" label="状态">
                    <el-tag type="info">审核中</el-tag>
                  </el-table-column>
                  <el-table-column width="300" align="center" label="操作">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button
                          type="primary"
                          icon="el-icon-postcard"
                          @click="edit(scope.row)"
                          >详情</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid)"
                        ></el-button>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="审核不通过">
                   <el-table
                  :data="reserveInfo"
                  height="600"
                  style="width: 100%"
                  border
                >
                  <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="50"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="applicant"
                    label="申请人"
                    width="180"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="申请人数">
                  </el-table-column>
                  <el-table-column
                    prop="meetingTime"
                    align="center"
                    label="申请时间段"
                  >
                  </el-table-column>
                  <el-table-column align="center" label="状态">
                    <el-tag type="danger">不通过</el-tag>
                  </el-table-column>
                  <el-table-column width="300" align="center" label="操作">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button
                          type="primary"
                          icon="el-icon-postcard"
                          @click="edit(scope.row)"
                          >详情</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid)"
                        ></el-button>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
      title="申请详情信息"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
    >
      <div class="con">
        <el-row type="flex" class="row-bg" justify="start">
          <span class="text-black">申请人：</span>
          <span>{{ applicant }}</span>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
          <span class="text-black">手机号：</span>
          <span>{{ phone }}</span>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
          <span class="text-black">邮 箱：</span>
          <span>{{ email }}</span>
        </el-row>

        <el-row type="flex" class="row-bg" justify="start">
          <span class="text-black">会议时间：</span>
          <span>{{ meetingTime }}</span>
        </el-row>

        <el-row type="flex" class="row-bg" justify="start">
          <span class="text-black">参会人数：</span>
          <span>{{ num }}</span>
        </el-row>

        <el-row type="flex" class="row-bg" justify="start">
          <span class="text-black">会议主题：</span>
          <span>{{ theme }}</span>
        </el-row>

        <el-row type="flex" justify="start">
          <div class="pt-3 text-black">会议主要内容：</div>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="22">
            <div class="text-left">{{ content }}</div>
          </el-col>
        </el-row>
        <el-row class="pt-3" type="flex" justify="start" align="middle">
          状态：
          <el-tag
            :type="state == 0 ? 'info' : state == 1 ? 'success' : 'danger'"
            >{{
              state == 0 ? "待审核" : state == 1 ? "通过" : "不通过"
            }}</el-tag
          >
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import host from "../../../../config/api";
export default {
  data() {
    return {
      reserveInfo: [],
      pageSize: 5, //每页条数
      totalCount: null, //总页数
      currentPage: 1, //当前页数
      keyWord: "",
      dialogVisible: false,
      rid: "",
      radio: null,
      content: "",
      state: null,
      theme: "",
      num: "",
      meetingTime: "",
      email: "",
      phone: "",
      applicant: "",
      switchs: [
        {
          value: "-1",
          label: "已参加",
        },
        {
          value: "0",
          label: "待参加",
        },
        {
          value: "1",
          label: "待审核",
        },
        {
          value: "1",
          label: "通过",
        },
        {
          value: "-1",
          label: "不通过",
        },
      ],
      passe: "",
    };
  },
  watch: {
    pageIndex() {
      this.getReserveInfo();
    },
  },
  mounted: function () {
    console.log(this.host);
    this.getReserveInfo();
  },
  methods: {
    //更新数据
    refresh() {
      this.getReserveInfo();
    },
    //提交审核结果
    submit() {
      console.log(this.rid);
      if (this.radio == null) {
        this.$message({
          type: "warning",
          message: "请选择是否通过",
        });
        return;
      } else if (this.radio == 1) {
        axios
          .post("reserve/updateState", {
            rid: this.rid,
            state: 1,
            reason: null,
          })
          .then((res) => {
            this.$message({
              type: res.data.flag ? "success" : "error",
              message: res.data.msg,
            });
            this.getReserveInfo();
            this.dialogVisible = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.$prompt("不通过的理由:", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            axios
              .post("reserve/updateState", {
                rid: this.rid,
                state: -1,
                reason: value,
              })
              .then((res) => {
                this.$message({
                  type: res.data.flag ? "success" : "error",
                  message: res.data.msg,
                });
                this.getReserveInfo();
                this.dialogVisible = false;
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      }
    },
    edit: function (row) {
      console.log(row);
      this.dialogVisible = true;
      this.applicant = row.applicant;
      this.num = row.num;
      this.theme = row.theme;
      this.phone = row.phone;
      this.email = row.email;
      this.content = row.content;
      this.meetingTime = row.meetingTime;
      (this.state = row.state), (this.rid = row.rid);
    },
    selectSearch(word) {
      if (word) {
        this.search(word);
      }
    },
    //搜索管理员
    search: function (word) {
      if (this.keyWord == "" && word == "") {
        this.$message({
          type: "warning",
          message: "请输入搜索内容！",
        });
      } else {
        axios
          .post("reserve/search", {
            keyWord: this.keyWord == "" ? word : this.keyWord,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          })
          .then((res) => {
            if (res.data.flag === false) {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            } else {
              this.reserveInfo = res.data.data;
              this.totalCount = res.data.data[0].totalCount;
              this.pagerCount = Math.ceil(
                res.data.data[0].totalCount / this.pageSize
              );
              console.log(res.data.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //改变页面
    changePage: function (e) {
      this.currentPage = e;
      this.getReserveInfo();
    },
    //获取管理员列表信息
    getReserveInfo: function () {
      var that = this;
      axios
        .post("reserve/getReserve", {
          currentPage: that.currentPage,
          pageSize: that.pageSize,
        })
        .then(function (res) {
          if (res.data.flag === false) {
            alert("fail");
          } else {
            that.reserveInfo = res.data.data;
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
    del(rid) {
      this.$confirm("删除用户, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
      })
        .then(() => {
          axios
            .post("reserve/del", {
              rid: rid,
            })
            .then((res) => {
              if (res.data.flag === false) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "error",
                });
              } else {
                this.getReserveInfo();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            })
            .catch((error) => {
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
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.messageBox {
  z-index: 9999 !important;
}

.text-black {
  color: black;
}
</style>
