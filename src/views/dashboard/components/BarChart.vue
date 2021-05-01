<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    xAxisData: { // x轴显示的年月
      type: Array,
      default: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    seriesData: { // 柱状数据
      type: Array,
      default: () => [
        { data: [1, 2, 3, 4, 5, 5, 6], name: '全球赢' },
        { data: [1, 2, 3, 4, 5, 5, 6], name: 'Ework' },
        { data: [1, 2, 3, 4, 5, 5, 6], name: 'SkyCloud' },
        { data: [1, 2, 3, 4, 5, 5, 6], name: 'SkyTree' },
        { data: [1, 2, 3, 4, 5, 5, 6], name: '智能投放' }
      ]
    }
  },
  data() {
    return {
      chart: null,
      series: []
    }
  },
  mounted() {
    this.handleSeries()
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleSeries() {
      for (var i = 0; i < this.seriesData.length; i++) {
        this.series.push({
          name: this.seriesData[i].name,
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.seriesData[i].data,
          animationDuration
        })
      }
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        animation: false,
        title: { // 标题
          text: '近5日发版次数统计',
          left: 'center' // 居中
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            color: 'white',
            fontSize: 13,
            fontWeight: 'bold'
          }
        },
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: this.series
      })
    }
  }
}
</script>
