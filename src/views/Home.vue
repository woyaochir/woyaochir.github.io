<template>
<el-row> <!-- 表示当前一行  el-col表示当前一行的内容所占的比例 -->
  <el-col :span="8" style="padding-right:10px">
    <el-card class="box-card">
      <div class="user">
        <img src="../assets/image/卡莎2.jpg" alt="">
        <div class="userinfo">
          <p class="name">Kasia</p>
          <p class="assess">我要K头</p>
        </div>
      </div>
      <div class="login-info">
        <p>上次登录时间：<span>2022-10-21</span></p>
        <p>上次登录地点：<span>武汉</span></p>
      </div>
    </el-card> 

    <el-card style="margin-top: 20px;">
        <el-table
          :data="tableData"
          style="width: 100%">
            <el-table-column v-for=" (val, key) in tableLabel" :prop="key" :label="val"/>
        </el-table>
    </el-card>
  </el-col>
  <el-col :span="16" style="padding-left:10px">
    <div class="num">
      <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex', padding:0,}">
        <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
        <div class="detail">
          <p class="price">￥{{item.value}}</p>
          <p class="desc">{{item.name}}</p>
        </div>
      </el-card>
    </div>
    <el-card style="height:260px">
      <!-- 折线图 -->
      <div ref="echarts1" style="height: 280px"></div>
    </el-card>
      <!-- 柱状图 -->
    <div class="graph">
      <el-card style="height:200px">
        <div ref="echarts2" style="height:220px"></div>
      </el-card>
      <!-- 饼状图 -->
      <el-card style="height:200px">
        <div ref="echarts3" style="height:180px"></div>
      </el-card>
    </div>
  </el-col>
</el-row>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      tableData:[],
      tableLabel: {
        name:'课程',
        todayBuy:"今日购买",
        totalBuy:'本月购买',
        monthBuy:'总购买'
      },
      countData:[
        {
          name:"今日支付订单",
          value:1234,
          icon:"success",
          color:"#2ec7c9",
        },
        {
          name:"今日收藏订单",
          value:210,
          icon:"star-on",
          color:"#ffb980",
        },
        {
          name:"今日未支付订单",
          value:1234,
          icon:"s-goods",
          color:"#5ab1ef",
        },
        {
          name:"本月支付订单",
          value:1234,
          icon:"success",
          color:"#2ec7c9",
        },
        {
          name:"本月收藏订单",
          value:210,
          icon:"star-on",
          color:"#ffb980",
        },
        {
          name:"本月未支付订单",
          value:1234,
          icon:"s-goods",
          color:"#5ab1ef",
        },
      ]
    }
  },
  mounted () {
    getData().then(({data}) => {
      const {tableData} = data.data  //  为什么打印的data是一个对象？？
      this.tableData = tableData;  // 将mock返回的数据拿过来
      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的配置项和数据
      var echarts1option = {}
      // 处理数据xAxis
      const { orderData, userData, videoData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data:xAxis
      }
      echarts1option.xAxis = {
        data:orderData.date
      }
      echarts1option.yAxis = {}
      echarts1option.legend =  xAxisData
      echarts1option.series = []
      xAxis.forEach(key => {
        console.log(key); // 这里打印key 结果是 '苹果'
        echarts1option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]), // 这里没有弄懂item[key]是什么意思  所以item[key] === item['苹果'] ？？
          type:'line'
        })
      })
      // 根据配置显示图表
    echarts1.setOption(echarts1option)

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend:{
          // 图例文字颜色
          textstyle:{
            color:"#333",
          },
        },
        grid:{
          left:"20%"
        },
        // 提示框
        tooltip: {
          trigger:'axis',
        },
        xAxis:{
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine:{
            lineStyle: {
              color:"#17b3a3"
            },
          },
          axisLabel: {
            interval:0,
            color:"#333"
          },
        },
        yAxis: [{
          type:"value",
          axisLine: {
            lineStyle:{
              color:"#17b3a3"
            },
          },
        }],
        color:["#2ec7c9", "#b6a2de"],
        series: [
          {
            name:'新增用户',
            data:userData.map(item => item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:userData.map(item => item.active),
            type:'bar'
          }
        ],
      }
      echarts2.setOption(echarts2Option)

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip:{
          trigger:"item"
        },
        color:[
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series:[
          {
            data:videoData,
            type:'pie'
          }
        ],
      }
      echarts3.setOption(echarts3Option)
    })
    
  }
}
</script>
<style lang="less" scoped>
  .user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img {
      margin-right: 40px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .userinfo {
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .assess {
        color: #999;
      }
    }
  }
  .login-info {
      p {
        line-height: 28px;
        font-size: 14px;
        color: #999;
      }
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .assess {
        color: #999;
      }
    }
    .num {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price {
          font-size: 30px;
          margin-bottom: 10px;
          line-height: 30px;
          height: 30px;
        }
        .desc {
          font-size: 14px;
          color: #999;
          text-align: center;
        }
      }
      .el-card {
          width: 32%;
          margin-bottom: 20px;
        }
    }
    .graph {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .el-card {
        width: 48%;
      }
    }
</style>