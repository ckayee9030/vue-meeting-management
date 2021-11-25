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
            <el-tabs type="border-card" @tab-click="tab_click">
              
              <el-tab-pane name=2 label="已参加">
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
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="参会人数">
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    align="center"
                    label="申请时间段"
                  >
                  </el-table-column>
                  <el-table-column align="center" label="状态">
                    <el-tag type="success">已参与</el-tag>
                  </el-table-column>
                  <el-table-column width="300" align="center" label="操作">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button
                          type="primary"
                          icon="el-icon-postcard"
                          @click="getRecordDetail(scope.row)"
                          >详情</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid,2)"
                        ></el-button>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane name=1 label="待参加">
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
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="参会人数">
                  </el-table-column>
                 <el-table-column
                    prop="time"
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
                          @click="getRecordDetail(scope.row)"
                          >详情</el-button
                        >
                        <!-- <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid)"
                        ></el-button> -->
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane name=0 label="审核中">
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
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="参会人数">
                  </el-table-column>
                 <el-table-column
                    prop="time"
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
                          @click="getRecordDetail(scope.row)"
                          >详情</el-button
                        >
                        <!-- <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid)"
                        ></el-button> -->
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane name=-1 label="审核不通过">
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
                    prop="theme"
                    label="会议主题"
                    align="center"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column prop="num" align="center" label="参会人数">
                  </el-table-column>
                 <el-table-column
                    prop="time"
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
                          @click="getRecordDetail(scope.row)"
                          >详情</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="del(scope.row.rid,-1)"
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
          <span>{{ name }}</span>
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
          <span class="text-black">申请时段：</span>
          <span>{{ meetingTime }}</span>
        </el-row>
         <el-row type="flex" class="row-bg" justify="start">
          <span class="text-black">会议室名称：</span>
          <span>{{ room_name }}</span>
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
        
        <el-row class="pt-1" v-show="state==-1" type="flex" justify="start">
          <div class="text-black">不通过的原因：</div>
        </el-row>
        <el-row v-show="state==-1" type="flex" class="row-bg" justify="start">
          <el-col :span="22">
            <div class="text-left">{{ reason }}</div>
          </el-col>
        </el-row>
        </div>
    
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios"
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
      uid:'',
      radio: null,
      content: "",
      state: null,
      theme: "",
      num: "",
      name:'',
      meetingTime: "",
      email: "",
      phone: "",
      applicant: "",
      reason:'',
      room_name:'',
      passe: "",
      tap_state:'',
    };
  },
  watch: {
  },
  mounted: function () {
    this.uid = JSON.parse(sessionStorage.getItem("isLogin")).uid;
    console.log(JSON.parse(sessionStorage.getItem("isLogin")))
    this.getReserveInfo(2);
  },
  methods: {
    tab_click(tap,e){
      console.log(tap.$options.propsData.name)
      this.getReserveInfo(tap.$options.propsData.name)
    },
     getRecordDetail: function (row) {
      console.log(row);
      this.dialogVisible = true;
      this.name = row.name
      this.num = row.num
      this.theme = row.theme
      this.phone = row.phone
      this.email = row.email
      this.content = row.content
      this.meetingTime = row.time
      this.state = row.state
      this.rid = row.rid
      this.reason = row.reason
      // this.room_name = row.room_name
    },
    //改变页面
    changePage: function (e) {
      this.currentPage = e;
      this.getReserveInfo();
    },
    //获取信息
    getReserveInfo: function (state) {
      var that = this;
      axios
        .post("users/getMyRecord", {
          currentPage: that.currentPage,
          pageSize: that.pageSize,
          uid:that.uid,
          state:state
        })
        .then(function (res) {
          if (res.data.flag === false) {
           that.reserveInfo = res.data.data;
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

    //删除
    del(rid,state) {
      this.$confirm("删除记录, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
      })
        .then(() => {
          axios
            .post("users/del", {
              rid: rid,
              state:state,
              uid:this.uid
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
.text-left{
  text-align: left;
}
.text-black {
  color: black;
}
.pt-1{
  padding-top:10px;
}
</style>
