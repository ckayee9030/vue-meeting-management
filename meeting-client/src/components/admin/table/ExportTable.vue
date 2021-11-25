<template>
  <div>
    <el-row
      type="flex"
      class="row-bg"
      style="margin-top: 0px; margin-bottom: 20px"
      justify="start"
    >
    <div>
  <span class="state">审核状态：</span>
      <el-select v-model="state" placeholder="所有审核状态">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div> 
    </el-row>
    <el-table :data="reserve_data" height="500" style="width: 100%" border>
      <el-table-column label="序号" type="index" align="center" width="50">
      </el-table-column>
      <el-table-column width="100" prop="account" label="申请人" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="email" align="center" label="邮箱" width="120">
      </el-table-column>
      <el-table-column prop="time" align="center" label="申请时段">
      </el-table-column>
       <el-table-column prop="room_name" align="center" label="会议室名称"
      >
      </el-table-column>
      <el-table-column width="80" prop="num" align="center" label="参会人数">
      </el-table-column>
      <el-table-column prop="theme" align="center" label="会议室主题">
      </el-table-column>
      <el-table-column width="80" prop="admin_name" align="center" label="管理员">
      </el-table-column>
         <el-table-column align="center" label="审核时间">
           <template slot-scope="scope">
            {{
              scope.row.isPasseTime?scope.row.isPasseTime : '--'
            }}
        </template>
      </el-table-column>
         <el-table-column width="80" align="center" label="审核状态">
           <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.state == 0
                ? 'info'
                : scope.row.state == 1
                ? 'success'
                : 'danger'
            "
            >{{
              scope.row.state == 0 ? "待审核": scope.row.state == 1? "通过" : "不通过"
            }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

 <div class="excel">
<download-excel
      class = "export-excel-wrapper"
      :data = "reserve_data"
      :fields = "json_fields"
      name = "会议室预约记录">
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button type="primary">导出EXCEL</el-button>
    </download-excel>
   </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ExportExcel",
  data() {
    return {
      reserve_data:[],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ],
       json_fields: {
         "申请人":"account", 
         "手机号":"phone", 
         "邮箱":"email", 
         "申请时段":"time", 
         "会议室名称":"room_name",
         "参会人数":"num", 
         "会议室主题":"theme", 
         "管理员":"admin_name", 
         "审核时间":"isPasseTime", 
         "审核状态":"state",
      },
       options:[
        {
          value: "0",
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
         {
          value: "3",
          label: "所有",
        },
      ],
      state:''
    };
  },
  watch: {
    state(a){
      console.log(a)
     this.getReserveData(a)
    }
  },
  mounted() {
    this.getReserveData(3)
  },
  methods: {
    getReserveData(state){
      axios.post('exportExcel/ReserveData',{
        state:state
      }).then((res)=>{
        if(res.data.flag){
          this.reserve_data = res.data.data
        }
        console.log(res.data.data)
      })
    }
  },

};
</script>
<style scoped>
.el-table{
  font-size: 10px;
  
}
::-webkit-scrollbar {
     width: 10px !important;
}
::-webkit-scrollbar {
     width: 10px !important;height: 0;
}
.excel{
  margin-top:20px;
}
.state{
  text-align: center;
  font-weight: 600;
}
</style>
