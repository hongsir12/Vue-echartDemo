<template>
  <div class="chart-container">
    <div class="chart" ref="chartRef"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null, //echarts图表实例
      chartOption: '',  // 图表配置项信息option
    }
  },
  created() {},
  mounted() {
    this.initChart()
    this.sendOption()
    // 接收编辑器组件传来的新的图表配置信息代码
    this.bus.$on('sendScript', res => {
      this.chartOption = res[0]
      if (res[1] === null) {
        this.changeChart(this.chartOption)
      } else {
        this.chartOption = `let data = ` + JSON.stringify(res[1]) + ';' + res[0]
        this.changeChart(this.chartOption)
      }
    })
  },
  methods: {
    // 初始化图表
    initChart() {
      // 初始化echart实例
      let myChart = this.$echarts.init(this.$refs.chartRef)
      let option
      option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%'],
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 1,
              lt: 3,
              color: 'rgba(0, 0, 180, 0.4)',
            },
            {
              gt: 5,
              lt: 7,
              color: 'rgba(0, 0, 180, 0.4)',
            },
          ],
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: '#5470C6',
              width: 5,
            },
            markLine: {
              symbol: ['none', 'none'],
              label: { show: false },
              data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
            },
            areaStyle: {},
            data: [
              ['2019-10-10', 200],
              ['2019-10-11', 560],
              ['2019-10-12', 750],
              ['2019-10-13', 580],
              ['2019-10-14', 250],
              ['2019-10-15', 300],
              ['2019-10-16', 450],
              ['2019-10-17', 300],
              ['2019-10-18', 100],
            ],
          },
        ],
      }
      myChart.setOption(option)
      this.chartInstance = myChart
      // 将option赋值给chartOption，此时chartOption内容是一个对象
      this.chartOption = option
    },
    // 向父组件传递图表option对象
    sendOption() {
      this.$emit('sendOption', this.chartOption)
    },
    changeChart(script) {
      // 用echarts时，如果不存在DOM，就会报错，处理方法先检查是否DOM存在：
      if (this.$refs.chartRef == null) {
        return
      }
      // 用echarts时，如果存在DOM，就会报存在警告，处理方法删除DOM：
      this.$echarts.dispose(this.$refs.chartRef)
      try {
        let func = new Function(
          'echarts',
          'ecStat',
          `const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';var option;let myChart = echarts.init(this.$refs.chartRef);` +
            script +
            `myChart.clear();option && myChart.setOption(option);`
        ).bind(this)
        func(this.$echarts, this.$ecStat)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
