import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts'
import ecStat from 'echarts-stat';
import ace from 'ace-builds'
import jq from 'jquery'
import componentsInstall from '@/components/install'
import vueXlsxTable from 'vue-xlsx-table'

// 引入全局css
import './assets/css/global.less'
// 将全局的echarts对象挂载到vue的原型对象上
Vue.prototype.$echarts = echarts
Vue.prototype.$ecStat = ecStat
// 创建bus总线
Vue.prototype.bus = new Vue()
window.$ = jq
Vue.config.productionTip = false
Vue.use(vueXlsxTable,{rABS:false})
// 转换时间格式挂载到Date原型对象上
Date.prototype.format = function (fmt) { //author: meizz   
  var o = {
      "M+": this.getMonth() + 1,                 //月份   
      "d+": this.getDate(),                    //日   
      "h+": this.getHours(),                   //小时   
      "m+": this.getMinutes(),                 //分   
      "s+": this.getSeconds(),                 //秒   
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
      "S": this.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Vue.use(ace)
Vue.use(componentsInstall)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
