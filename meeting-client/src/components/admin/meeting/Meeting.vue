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
              placeholder="请输入用户关键词"
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
      <el-col :span="4" style="margin-top: 10px">
        <el-button
          size="medium"
          type="primary"
          icon="el-icon-plus"
          @click="clickAdd()"
        ></el-button>
      </el-col>
    </el-row>
    <el-table :data="meetingInfo" height="600" style="width: 100%" border>
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column prop="number" label="编号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="name" align="center" label="名称">
      </el-table-column>
      <el-table-column align="center" label="会议室图片">
        <template width="300" slot-scope="scope">
          <img
            style="width: 200px; height: 100px; border: none"
            :src="host + scope.row.img"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="admit"
        label="可容纳人数"
        align="center"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="state" align="center" label="会议室状态">
        <template width="300" slot-scope="scope">
          {{ scope.row.state == 0 ? "可预约" : "不可预约" }}
        </template>
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
              @click="del(scope.row.rid)"
            ></el-button>
            <el-switch
              v-model="scope.row.isPublish"
              active-color="#13ce66"
              inactive-color="#ddd"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="关闭"
              @change="isPublish(scope.row.rid, scope.row.isPublish)"
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
      :title="add_update == 0 ? '添加会议室信息' : '修改会议信息'"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
    >
      <div>
        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="22">
            <el-input v-model="number">
              <template slot="prepend">编号</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="22">
            <el-input v-model="name">
              <template slot="prepend">名称</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="22">
            <el-input v-model="address">
              <template slot="prepend">地址</template>
            </el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="22">
            <el-input v-model="admit">
              <template slot="prepend">容纳人数</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <div class="pt-2">会议室图片</div>
        </el-row>
        <el-row type="flex" justify="start">
          <el-image
            style="width: 150px; height: 100px"
            :src="host + img"
            fit="contain"
          ></el-image>
          <el-upload
            :action="host + '/meetings/uploads'"
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

        <el-row type="flex" justify="start">
          <div class="pt-3">会议室设备：</div>
        </el-row>
        <el-row type="flex" class="row-bg" justify="start">
          <el-col :span="22">
            <el-input
              v-model="equipment"
              type="textarea"
              placeholder="请输入设备信息"
              maxlength="300"
              show-word-limit
              rows="10"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            v-show="add_update === 0"
            type="primary"
            @click="addMeeting()"
            >确 定</el-button
          >
          <el-button
            v-show="add_update === 1"
            type="primary"
            @click="updateMeeting()"
            >确 定</el-button
          >
        </span>
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
      meetingInfo: [],
      pageSize: 5, //每页条数
      totalCount: null, //总页数
      currentPage: 1, //当前页数
      keyWord: "",
      dialogVisible: false,
      maxSize: 10240000,
      maxCount: 1,
      filesArr: [],
      host: host.api,
      equipment: "",
      admit: "",
      number: "",
      name: "",
      address: "",
      add_update: 2,
      img: "",
      passe: "",
      rid:''
    };
  },
  watch: {
    pageIndex() {
      this.getMeetingInfo();
    },
    dialogVisible(a){
      if(!a){
        this.img=""
      }
    }
  },
  mounted: function () {
    console.log(this.host);
    this.getMeetingInfo();
  },
  methods: {
    upload: function (res, file, fileList) {
      this.$message({
        type: "success",
        message: "上传成功!",
      });
      
      this.img = res.imgUrl[0];
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
    //更新数据
    refresh() {
      this.getMeetingInfo();
    },
    clickAdd: function () {
      this.add_update = 0;
      this.name = "";
      this.admit = "";
      this.address = "";
      this.number = "";
      this.img = "";
      this.equipment = "";
      this.dialogVisible = true;
    },
    //添加
    addMeeting: function () {
      if (this.number == "") {
        this.$message({
          message: "编号不能为空！",
          type: "warning",
        });
      } else if (this.name == "") {
        this.$message({
          message: "名称不能为空！",
          type: "warning",
        });
      } else if (this.address == "") {
        this.$message({
          message: "地址不能为空！",
          type: "warning",
        });
      } else if (this.admit == "") {
        this.$message({
          message: "容纳人数不能为空！",
          type: "warning",
        });
      } else if (this.equipment == "") {
        this.$message({
          message: "请填写会议设备！",
          type: "warning",
        });
      } else {
        this.$confirm("添加会议室信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            axios
              .post("meetings/addMeeting", {
                name: this.name,
                admit: this.admit,
                address: this.address,
                number: this.number,
                img: this.img,
                equipment: this.equipment,
              })
              .then((res) => {
                if (res.data.flag === false) {
                  this.$message({
                    type: "info",
                    message: res.data.msg,
                  });
                } else {
                  this.getMeetingInfo();
                  this.$message({
                    type: "success",
                    message: res.data.msg,
                  });
                  this.dialogVisible = false;
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });

        // this.$confirm("添加会议室信息, 是否继续?",'提示', {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        // })
        //   .then(() => {
        //     var that = this;
        //     axios.post("meeting/addMeeting", {
        //         name: that.name,
        //         admit: that.admit,
        //         address: that.address,
        //         number: that.number,
        //         img: that.img,
        //         equipment: taht.equipment,
        //       })
        //       .then(function (res) {
        //         if (res.data.flag === false) {
        //           that.$message({
        //             type: "info",
        //             message: res.data.msg,
        //           });
        //         } else {
        //           that.getMeetingInfo();
        //           that.$message({
        //             type: "success",
        //             message: res.data.msg,
        //           });
        //           setTimeout(() => {
        //             that.dialogVisible = false;
        //           }, 1000);
        //         }
        //       })
        //   })
        //   .catch(() => {
        //     console.log("quxaiao")
        //     this.$message({
        //       type: "info",
        //       message: "已取消添加",
        //     });
        //       this.dialogVisible = false;
        //   });
      }
    },
    edit: function (row) {
      this.add_update = 1;
      this.dialogVisible = true;
      this.name = row.name;
      this.admit = row.admit;
      this.address = row.address;
      this.number = row.number;
      this.img = row.img;
      this.equipment = row.equipment;
      this.rid=row.rid
    },

    //提交修改管理员信息
    updateMeeting: function () {
      this.dialogVisible1 = true;
      this.$confirm("修改会议室信息, 是否继续?", "提示", {
        confirmButtonText: "确定修改",
        cancelButtonText: "取消修改",
        lockScroll: true,
        type: "warning",
      })
        .then(() => {
          axios
            .post("meetings/update", {
              rid:this.rid,
              name: this.name,
              admit: this.admit,
              address: this.address,
              number: this.number,
              img: this.img,
              equipment: this.equipment,
            })
            .then((res) => {
              if (res.data.flag === false) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "error",
                });
              } else {
                this.getMeetingInfo();
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
                setTimeout(() => {
                  this.dialogVisible = false;
                }, 1000);
              }
            })
            .catch((error) => {
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
    isPublish: function (rid, state) {
      var that = this;
      axios
        .post("meetings/updateState", {
          rid: rid,
          state: state,
        })
        .then(function (res) {
          if (state == 1) {
            that.$message({
              type: "success",
              message: "开启会议室",
            });
          } else {
            that.$message({
              type: "success",
              message: "关闭会议室",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //搜索
    search: function () {
      if (this.keyWord == "") {
        this.$message({
          type: "warning",
          message: "请输入搜索内容！",
        });
      } else {
        var that = this;
        axios
          .post("meetings/search", {
            keyWord: this.keyWord == "" ? word : this.keyWord,
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
              this.meetingInfo = res.data.data;
              that.totalCount = res.data.data[0].totalCount;
              that.pagerCount = Math.ceil(
                res.data.data[0].totalCount / that.pageSize
              );
              console.log(res.data.data);
            }
          })
          .catch((error)=> {
            console.log(error);
          });
      }
    },

    //改变页面
    changePage: function (e) {
      this.currentPage = e;
      this.getMeetingInfo();
    },
    //获取表信息
    getMeetingInfo: function () {
      var that = this;
      axios
        .post("meetings/getRooms", {
          currentPage: that.currentPage,
          pageSize: that.pageSize,
        })
        .then(function (res) {
          if (res.data.flag === false) {
            alert("fail");
          } else {
            that.meetingInfo = res.data.data;
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
    del(rid) {
      this.$confirm("是否确定删除会议室?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        lockScroll: false,
        type: "warning",
      })
        .then(() => {
          axios
            .post("meetings/del", {
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
                this.getMeetingInfo();
                this.$message({
                  type: "success",
                  message: "删除成功!",
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
.el-upload {
  width: 100px !important;
  height: 100px !important;
  line-height: 100px !important;
}
</style>
