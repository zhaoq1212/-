import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./common/common.css"
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import echarts from 'echarts'
import "./permission"
require("./mock/mock.js")
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
//vue实例调用render方法的时候，会传入一个createElement函数作为参数
Vue.use(ElementUI);
new Vue({
   router,
   store,
  render: h => h(App)
}).$mount('#app')

