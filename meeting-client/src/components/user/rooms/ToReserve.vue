<template>
  <div>
    <el-page-header @back="goBack" :content="name"> </el-page-header>
    <div class="con">
      <div class="content">
        <el-table
          :data="time_quantum"
          border
          style="width: 100%"
          current-row-key
        >
          <el-table-column prop="time_quantum" align="center" label="时间段">
          </el-table-column>
          <el-table-column align="center" :label="day.one + ' ' + week.one">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.one == 0
                    ? 'info'
                    : scope.row.one == 2
                    ? 'success'
                    : 'danger'
                "
                @click="
                  select(scope.row.id, 'one', scope.row.one, scope.$index)
                "
                >{{
                  scope.row.one == 0
                    ? "可预约"
                    : scope.row.one == 2
                    ? "已选中"
                    : "不可选"
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" :label="day.two + ' ' + week.two">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.two == 0
                    ? 'info'
                    : scope.row.two == 2
                    ? 'success'
                    : 'danger'
                "
                @click="
                  select(scope.row.id, 'two', scope.row.two, scope.$index)
                "
                >{{
                  scope.row.two == 0
                    ? "可预约"
                    : scope.row.two == 2
                    ? "已选中"
                    : "不可选"
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" :label="day.three + ' ' + week.three">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.three == 0
                    ? 'info'
                    : scope.row.three == 2
                    ? 'success'
                    : 'danger'
                "
                @click="
                  select(scope.row.id, 'three', scope.row.three, scope.$index)
                "
                >{{
                  scope.row.three == 0
                    ? "可预约"
                    : scope.row.three == 2
                    ? "已选中"
                    : "不可选"
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" :label="day.four + ' ' + week.four">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.four == 0
                    ? 'info'
                    : scope.row.four == 2
                    ? 'success'
                    : 'danger'
                "
                @click="
                  select(scope.row.id, 'four', scope.row.four, scope.$index)
                "
                >{{
                  scope.row.four == 0
                    ? "可预约"
                    : scope.row.four == 2
                    ? "已选中"
                    : "不可选"
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" :label="day.five + ' ' + week.five">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.five == 0
                    ? 'info'
                    : scope.row.five == 2
                    ? 'success'
                    : 'danger'
                "
                @click="
                  select(scope.row.id, 'five', scope.row.five, scope.$index)
                "
                >{{
                  scope.row.five == 0
                    ? "可预约"
                    : scope.row.five == 2
                    ? "已选中"
                    : "不可选"
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" :label="day.six + ' ' + week.six">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.six == 0
                    ? 'info'
                    : scope.row.six == 2
                    ? 'success'
                    : 'danger'
                "
                @click="
                  select(scope.row.id, 'six', scope.row.six, scope.$index)
                "
                >{{
                  scope.row.six == 0
                    ? "可预约"
                    : scope.row.six == 2
                    ? "已选中"
                    : "不可选"
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" :label="day.seven + ' ' + week.seven">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.seven == 0
                    ? 'info'
                    : scope.row.seven == 2
                    ? 'success'
                    : 'danger'
                "
                @click="
                  select(scope.row.id, 'seven', scope.row.seven, scope.$index)
                "
                >{{
                  scope.row.seven == 0
                    ? "可预约"
                    : scope.row.seven == 2
                    ? "已选中"
                    : "不可选"
                }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="submit">
          <el-button
            :type="select_time.length > 0 ? 'success' : ''"
            round
            @click="pre_submit()"
            >提 交 预 约</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      title="填写预约信息"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
    >
      <div>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="theme" placeholder="请输入会议主题">
              <template slot="prepend">会议主题</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input v-model="num" placeholder="请输入会议人数">
              <template slot="prepend">会议人数</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="row-bg">
          <div class="text-left">会议室主要内容:</div>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="20">
            <el-input
              v-model="content"
              type="textarea"
              rows="8"
              placeholder="请输入会议室的主要内容"
            >
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      time_quantum: [],
      name: "",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      select_time: [],
      dialogVisible: false,
      theme: "",
      content: "",
      num: "",
      day: "",
      week: "",
      uid:'',
      rid:''
    };
  },
  watch: {
    dialogVisible(a) {
      if (!a) {
        this.theme = "";
        this.content = "";
        this.num = "";
      }
    },
  },
  mounted() {
    this.getDate();
    let rid = this.$route.params.params.split(":")[0];
    this.rid = rid
    this.name = this.$route.params.params.split(":")[1];
    this.uid=JSON.parse(sessionStorage.getItem("isLogin")).uid;
    this.getTimeQuantum(rid);
  },
  methods: {
    select(id, quantum, state, index) {
      if (state == 1) {
        this.$message({
          showClose: true,
          message: "该时间段不可选",
          type: "error",
        });
      } else {
        if (this.select_time.includes(index + ":" + quantum+":"+id)){
          this.time_quantum[index][quantum] = 0; //取消
          this.delete(index + ":" + quantum+":"+id);
        } else {
          if (this.select_time.length == 3) {
            console.log(this.select_time);
            this.$message({
              showClose: true,
              message: "最多只能选择3个时间段",
              type: "warning",
            });
            return;
          }
          this.time_quantum[index][quantum] = 2; //选中
          this.select_time.push(index + ":" + quantum+":"+id);
          console.log(this.select_time)
        }
      }
    },
    pre_submit() {
      console.log(this.select_time);
      if (this.select_time.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择预约时间段",
          type: "warning",
        });
        return;
      }
      this.dialogVisible = true;
    },
    submit() {
      if (this.theme == "") {
        this.$message({
          showClose: true,
          message: "会议主题不能为空！",
          type: "warning",
        });
        return;
      } else if (this.num == "") {
        this.$message({
          showClose: true,
          message: "请填写会议大概人数！",
          type: "warning",
        });
        return;
      } else if (isNaN(this.num)||Number(this.num)>10000) {
        this.$message({
          showClose: true,
          message: "请正确填写数字！",
          type: "warning",
        });
        return;
      } else if (this.content == "") {
        this.$message({
          showClose: true,
          message: "请填写会议主要内容！",
          type: "warning",
        });
        return;
      }
      axios
        .post("users/submitReserve", {
          select_time: this.select_time,
          uid: this.uid,
          theme: this.theme,
          content: this.content,
          num: this.num,
          room_name:this.name,
          room_id:this.rid
        })
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: res.data.flag ? "success" : "error",
          });
          this.dialogVisible = false;
          console.log(res);
        })
        .catch((err) => {
          onsole.log(err);
        });
    },
    //
    delete(i) {
      var index = this.select_time.indexOf(i);
      this.select_time.splice(index, 1);
    },
    //
    goBack() {
      window.location = "#/rooms";
    },
    //
    getTimeQuantum(rid) {
      axios
        .post("rooms/getTimeQuantum", {
          rid: rid,
        })
        .then((res) => {
          if (res.data.flag) {
            let data = res.data.data;
            data.forEach((item, i) => {
              let hour = Number(moment().format("HH"))+Number(moment().format("mm"))/60;
              let _time = Number(item.time_quantum.split(":")[0]);
              if (hour > _time) {
                data[i].one = 1;
              }
              if (i == data.length - 1) {
                this.time_quantum = data;
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDate() {
      var week = {};
      var day = {};
      let arr = ["one", "two", "three", "four", "five", "six", "seven"];
      for (let i = 0; i < 7; i++) {
        week[arr[i]] = moment().add(i, "days").format("dddd").substr(0, 3);
        day[arr[i]] = moment().add(i, "days").format("DD");
      }
      this.week = week;
      this.day = day;
    },
  },
};
</script>
<style scoped>
.con {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  position: relative;
  justify-content: start;
}
.content {
  width: 85vw;
  position: absolute;
  top: 0;
  z-index: 1;
}
.el-tag {
  width: 150px;
  cursor: pointer;
  font-size: 16px;
}
.submit {
  margin-top: 20px;
}
.text-left {
  text-align: left;
  padding-left: 35px;
  font-weight: 600;
}
.row-bg {
  padding-bottom: 10px;
}
</style>