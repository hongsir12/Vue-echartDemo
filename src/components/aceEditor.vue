<template>
  <div class="ace-container">
    <div class="btn-wrap">
      <vue-xlsx-table @on-select-file="handleSelectedFile"
      >上传excel</vue-xlsx-table
    >
    <button id="reset" @click="resetChartData">重置数据</button>
      <button id="submit" @click="sendChartOption">运行</button>
    </div>
    <div class="ace-editor" ref="ace"></div>
  </div>
</template>
<script>
import ace from 'ace-builds'
// 在webpack环境中使用必须要导入
import 'ace-builds/webpack-resolver'
// 默认设置的主题
import 'ace-builds/src-noconflict/theme-monokai'
// 默认设置的语言模式
import 'ace-builds/src-noconflict/mode-javascript'
export default {
  data() {
    return {
      aceEditor: null,
      scriptStr: '',  //编辑器内容
      // 不导入webpack-resolver该模块路径会报错
      themePath: 'ace/theme/monokai',
      modePath: 'ace/mode/javascript',
      data:null,  // excel表的数据
    }
  },
  props:[
    'option'
  ],
  created() {
  },
  mounted() {
    this.aceEditor = ace.edit(this.$refs.ace, {
      // 最大行数，超过会自动出现滚动条
      maxLines: 24,
      // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
      minLines: 24,
      // 编辑器内字体大小
      fontSize: 14,
      // 默认设置的主体
      theme: this.themePath,
      // 默认设置的语言模式
      mode: this.modePath,
      // 制表符设置为4个空格大小
      tabSize: 4,
    });
  },
  watch:{
    // 监听父组件传来的值
    option:function(newVal,oldVal){
      // 将新值，也就是option编辑器内容字符串，赋值给scriptStr
      this.scriptStr = newVal
      // 设置编辑器内容
      this.setAceEditorValue()
    }
  },
  methods: {
      // 设置编辑器内容
    setAceEditorValue() {
      this.aceEditor.setValue(this.scriptStr, 1)
    },
    // 点击重置数据按钮，清除excel表数据
    resetChartData(){
      this.data = null
    },
    // 点击上传按钮获取excel表数据
    handleSelectedFile(convertedData) {
      this.data = convertedData.body
    },
    // 点击运行按钮向图表组件传输新的图表配置
    sendChartOption() {
      // 点击运行按钮获取编辑器内容
      this.scriptStr = this.aceEditor.getValue()
      let script = this.scriptStr
      // 将新的 编辑器内容 以及 excel表数据 传给图表组件
      this.bus.$emit('sendScript',[script,this.data])
    },
  },
}
</script>
<style lang="less" scoped>
.ace-container {
  position: relative;
  width: 100%;
  height: 100%;
  .btn-wrap {
    background: #f3f3f3;
    text-align: right;
    position: relative;
    z-index: 1;
  }
  
}
</style>
