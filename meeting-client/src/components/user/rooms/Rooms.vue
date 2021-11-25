<template>
  <div class="con">
    <el-table :data="Rooms" height="600" style="width: 80vw" border>
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column prop="number" label="会议室编号" width="300" align="center">
      </el-table-column>
      <el-table-column prop="name" label="会议室名称" align="center" width="300">
      </el-table-column>
    <el-table-column label="预约状态" align="center" width="300">
       <template width="300" slot-scope="scope">
         <el-tag :type="scope.row.isPublish==1?'success':'danger'"> {{ scope.row.isPublish == 1 ? "可预约" : "不可预约" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="300" align="center" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-date"
              @click="detail(scope.row)"
            >查看详情</el-button>
            <el-button
            icon="el-icon-alarm-clock"
              type="success"
              @click="toReserve(scope.row.rid,scope.row.name,scope.row.isPublish)"
            >预约</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>



    <!--详情信息系信息-->
    <el-dialog
      title="会议室详情信息"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="50%"
    >
      <div>
         <el-card class="box-card">
  <div slot="header" class="clearfix">
  </div>
  <div class="text item">
        <div>
            <span>会议室编号:</span>
            {{number}}
        </div>
         <div>
            <span>会议室名称:</span>
            {{name}}
        </div>
         <div>
            <span>会议室地址:</span>
            {{address}}
        </div>
         <div>
            <span>可容纳人数:</span>
            {{admit}}
        </div>
        <div>
            <span>会议室实图:</span>
        <el-image
      style="width:600px; height: 400px"
      :src="host+img"
        fit="scale-down">
      </el-image>
        </div>
        <div>
            <span>会议室设备:</span>
            <div>{{equipment}}</div>
        </div>
         <div>
            <span>状态:</span>
            <div><el-tag :type="isPublish==1?'success':'danger'">{{isPublish==1?'可预约':'不可预约'}}</el-tag></div>
        </div>
  </div>
</el-card>
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
      host: host.api,
      Rooms: [],
      keyWord: "",
      value1: true,
      value2: true,
      dialogVisible: false,
      dialogVisible: false,
      name: "",
      admit: "",
      number: "",
      address: "",
      img: "",
      equipment: "",
      isPublish: "",
    };
  },
  watch: {
    pageIndex() {
      this.getRooms();
    },
  },
  mounted: function () {
    this.getRooms();
  },
  methods: {
    //更新数据
    refresh() {
      this.getRooms();
    },
    clickAdd: function () {
      this.account = "";
      this.pwd = "";
      this.gender = "";
      this.phone = "";
      this.dialogVisible = true;
    },
    detail: function (row) {
      this.dialogVisible = true;
      this.img = row.img;
      this.address = row.address;
      this.admit = row.admit;
      this.equipment = row.equipment;
      this.name = row.name;
      this.number = row.number;
      this.isPublish = row.isPublish;
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
              this.Rooms = res.data.data;
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

    //获取管理员列表信息
    getRooms: function () {
      var that = this;
      axios
        .post("rooms/getRooms")
        .then(function (res) {
          if (res.data.flag) {
            that.Rooms = res.data.data;
            console.log(res.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //删除会议室（管理员）
   toReserve(rid,name,state){
     if(state==0){
        this.$message({
          showClose: true,
          message: "该会议室暂时不可预约",
          type: "warning",
        });
        return
     }
     window.location="#/to_reserve/"+rid+":"+name
   },
  },
};
</script>

<style scoped>
.con{
  padding-top: 60px;
}
.text {
  font-size: 18px;
}

.item {
  margin: 20px auto;
  text-align: left;
}
.item div > span {
  font-weight: 600;
}
.item > div {
  padding-bottom: 10px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
