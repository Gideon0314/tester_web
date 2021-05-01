<template>
  <div class="dashboard-container">
    <panel-group
      :atotal="atotal"
      :btotal="btotal"
      :ctotal="ctotal"
      :dtotal="dtotal"
    />
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <!-- 饼状图： 各技术频道文章统计 -->
          <pie-chart
            v-if="flag"
            :legend-data="categoryTotal.nameList"
            :series-data="categoryTotal.nameAndValueList"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <!-- 柱状图： 近6个月发布的文章数 -->
          <bar-chart
            v-if="flag"
            :x-axis-data="monthAritcleTotal.yearMonthList"
            :series-data="monthAritcleTotal.aritcleTotalList"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import PanelGroup from './components/PanelGroup'
import api from '@/api/test'

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
      dtotal: 0,

      flag: false,
      categoryTotal: {},
      monthAritcleTotal: {}
    }
  },
  mounted() {
    // 查询首页统计数据
    this.getTotal()
    this.getArticleTotal()
  },
  methods: {
    async getTotal() {
      const { data: total } = await api.test()
      this.atotal = total.a
      this.btotal = total.b
      this.ctotal = total.c
      this.dtotal = total.c
    },
    async getArticleTotal() {
      // 每个分类下的文章数
      const { data: categoryTotal } = await api.test_pie()
      this.categoryTotal = categoryTotal
      // 查询近6个月发布的文章数
      const { data: monthAritcleTotal } = await api.test_bar()
      this.monthAritcleTotal = monthAritcleTotal
      // 数据加载完成，显示子组件
      this.flag = true
    }
  }
}
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
