<template>
  <div class="con">
    <el-select v-model="value" placeholder="请选择" @change="changeSelect()">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <div id="echart" class="eChats" style="width:80vw;"></div>
  </div>
</template>
<script>
  import axios from 'axios'
    export default {
        name: "Index",
      data(){
        return {
          title:'选择不同条件查看',
          data:'',
          x_data:'',
          y_data:'',
          activeName:'first',
          options: [{
          value: '11',
          label: '会议室被预约次数'
        }, {
          value: '22',
          label: '时间段被预约次数'
        }],
        value:'',
        allData:'',
        label:'',
        room_data:{}
        }
      },
        mounted() {
         this.getData()
        },
        methods:{
        changeSelect(){
            if(this.value==22){
              this.title = '时间段被预约次数'
             this.get_time_quantum_reserve_count()
            }else if(this.value==11){
          this.getData()
          this.line()
            }else{
              console.log(this.room_data[this.value].name)
            this.title = this.room_data[this.value].name
            this.get_one_room_time_quantum_reserve_count(this.value)
            }
        },
        getData(){
        axios.post('/rooms/room_data').then((res)=>{
            var room_name_arr = [],
                room_reserve_count = []
              res.data.data.forEach(item => {
                room_name_arr.push(item.name)
                room_reserve_count.push(item.reserve_count)
                let obj = {}
                   obj.value = item.room_id
                   obj.label = item.name+"时间段预约次数"
                   if (!this.options.some(option => option.value === obj.value)) {
                     this.options.push(obj)
                   }
                   this.room_data[item.room_id] = item
              });
            this.y_data = room_reserve_count
            this.x_data = room_name_arr
            this.title = '会议室内预约次数',
            this.allData = res.data.data
             this.line()
              console.log(res.data.data)
            }).catch(function(error){
                console.log(error)
              })
            },
        get_time_quantum_reserve_count(){
           this.x_data = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'] 
            var y= []
            let a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0
            this.allData.forEach((item)=>{
              a = a+item.a
              b=b+item.b
              c = c+item.c
              d=d+item.d
              e = e+item.e
              f=f+item.f
              g = g+item.g
              h=h+item.h
              i = i+item.i
              j=j+item.j
              k = k+item.k
              l=l+item.l
              m=m+item.m
            })
            
            y.push(a)
            y.push(b)
            y.push(c)
            y.push(d)
            y.push(e)
            y.push(f)
            y.push(j)
            y.push(h)
            y.push(i)
            y.push(j)
            y.push(k)
            y.push(l)
            y.push(m)
            this.y_data = y
            this.line()
           
        },
        get_one_room_time_quantum_reserve_count(rid){
          let one_room_data = this.room_data[rid]
          console.log(one_room_data.name)
          this.title ='"'+one_room_data.name+'"'+"时间段预约次数"
          this.x_data = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'] 
          var y= []
          y.push(one_room_data.a)
          y.push(one_room_data.b)
          y.push(one_room_data.c)
          y.push(one_room_data.d)
          y.push(one_room_data.e)
          y.push(one_room_data.f)
          y.push(one_room_data.j)
            y.push(one_room_data.h)
            y.push(one_room_data.i)
            y.push(one_room_data.j)
            y.push(one_room_data.k)
            y.push(one_room_data.l)
            y.push(one_room_data.m)
            this.y_data =y
          this.line()
        },
           line:function(){
            // this.id="main1"
            //直接引用进来使用
            var echarts = require('echarts');
            // 基于准备好的dom，获取main节点init初始化echarts实例
            let myChart2 = echarts.init(document.getElementById('echart'));
            // 指定图表的配置项和数据
             this.data = this.room_reserve_count
            var option = {
              //显示滚动条
              dataZoom: [
                        {
                          show: true,
                          realtime: true,
                          start: 0,
                          end: 100
                        },
                        {
                          type: 'inside',
                          realtime: true,
                          start: 0,
                          end: 200
                        }
                      ],
              title: {
                text: this.title, //头部名称
                x: 'center' //居中
              },
              tooltip: {},
              legend: { //图列的显示
                data: [`'${this.title}'`], //图列，就是显示在右侧的那个蓝色小方块
                top: '0',// legend 放置位置。
                right: "200", //右边100个像素位置
                orient: 'vertical' // 纵向布局。
              },

              xAxis: {
                data: this.x_data ,
                //x轴显示数据名称
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: '#595C61'
                  },
                  rotate: 0, //文字旋转度数0为横向显示，90竖直显示文字
                  //X轴文字过长，隐藏。
                  // formatter:function(value){
                  //   if(value.length > 6){
                  //     return `${value.slice(0,5)}...`;
                  //   }
                  //   return value;
                  // }
                },
                //x轴刻度相关
                axisTick: {
                  alignWithLabel: true, //刻度居中对齐文字
                  show: true,
                  interval: 0
                }
              },
              yAxis: {}, //y轴数据，不填它会自适应
              series: [
                {
                  name: this.title,
                  type: 'line', //类型，bar柱形，line折线，pie饼图等等
                  data: this.y_data,//柱条数据
                  label: { //标签，
                    show: true, //显示柱形头上的数字
                    position: "outside", //显示在柱形头上
                    color: "rgba(0, 0, 0, 1.0)" //文字颜色
                  }
                },
              ],
              itemStyle: {
                // 设置柱形的颜色
                color: '#5099e6',
              },
              toolbox: { //可视化的工具箱
                show: true,
                 x:120,
                feature: {
                    dataView: { //数据视图
                        show: true
                    },
                    restore: { //重置
                        show: true
                    },
                    dataZoom: { //数据缩放视图
                        show: true
                    },
                    saveAsImage: {//保存图片
                        show: true
                    },
                    magicType: {//动态类型切换
                        type: ['bar', 'line']
                    },
                     iconStyle:{
                    normal:{
                      color:'red',//设置颜色
                    }
                }
      
                }
            },
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option);
          },
          }
    }
</script>

<style scoped>
.el-select{
   margin:50px;
}
  .eChats{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width:100%;
    height:400px;
    margin: 0 auto;
  }
</style>
