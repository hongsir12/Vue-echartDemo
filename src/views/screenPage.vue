<template>
  <div class="screen-container">
    <div class="screen-header">
      <ace :option="scriptStr"></ace>
    </div>
    <div class="screen-body">
      <echartContainer ref="eCRef" @sendOption=getOption></echartContainer>
    </div>
  </div>
</template>
<script>
import echartContainer from '@/components/echartContainer'
export default {
  data() {
    return {
      scriptStr: '',
    }
  },
  mounted() {
  },
  methods: {
    getOption(res) {
      console.log(res);
      // 接收图表组件传来的option对象，将其转换为字符串形式
      res = JSON.stringify(res,null,2)
      // 拼接成要返回给编辑器内容的字符串格式，传给编辑器子组件
      this.scriptStr = `option = ${res};`
    },
  },
  components: {
    echartContainer,
  },
}
</script>
<style lang="less" scoped>
.screen-header {
  width: 50%;
  height: 50%;
}
.screen-body {
  width: 100%;
  height: 50%;
  background-color: #f2f3f5;
}
</style>
