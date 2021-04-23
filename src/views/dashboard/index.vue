<template>
  <div class="dashboard-container">
    <panel-group
      :atotal="atotal"
      :btotal="btotal"
      :ctotal="ctotal"
      :dtotal="dtotal"
    />
    <el-row :gutter="40" >
      <el-col :xs="24" :sm="24" :lg="12" >
        <el-card>
          <!-- 饼状图： 各技术频道文章统计 -->
          <pie-chart />
        </el-card>
        </el-col>
      <el-col :xs="24" :sm="24" :lg="12" >
        <el-card>
          <!-- 柱状图： 近6个月发布的文章数 -->
          <bar-chart />
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import PanelGroup from './components/PanelGroup'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup, BarChart, PieChart
  },
  data() {
    return {
      atotal: 0,
      btotal: 0,
      ctotal: 0,
      dtotal: 0
    }
  }
}
// import echarts from 'echarts'
//
// export default {
//   name: 'DashboardAdmin',
//   components: {
//     PanelGroup,
//     PieChart,
//     BarChart
//   },
//   mounted() {
//     // 查询首页统计数据
//     this.getTotal()
//   },
//   methods: {
//     async getTotal() {
//       const { data: total } = await api.getDataTotal()
//       this.atotal = total.a
//       this.btotal = total.b
//       this.ctotal = total.c
//       this.dtotal = total.c
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
