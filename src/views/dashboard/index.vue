<template>
  <div class="dashboard-container">
    <panel-group
      :atotal="atotal"
      :btotal="btotal"
      :ctotal="ctotal"
      :dtotal="dtotal"
    />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup
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
