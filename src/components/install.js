// 管理安装自定义的组件

// ace组件
import ACE from '@/components/aceEditor.vue'

export default {
    install: function(Vue,options){
        // 引号中的字符串就是之后的组件标签名，即<ace></ace>
        Vue.component('ace',ACE)
    }
}