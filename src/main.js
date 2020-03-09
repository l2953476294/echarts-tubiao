import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
Vue.prototype.echarts = echarts;
// console.log( echarts )
import 'echarts-gl';
Vue.config.productionTip = false

import $ from 'jquery'
Vue.prototype.$ = $



/*
  你可以使用如下命令通过 npm 安装 ECharts
    npm install echarts --save


*/


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
