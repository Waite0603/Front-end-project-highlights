import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' //引入饿了么包
import 'element-ui/lib/theme-chalk/index.css' //引入饿了么样式
import elTableInfiniteScroll from 'el-table-infinite-scroll'
Vue.use(elTableInfiniteScroll)
Vue.use(ElementUI) // 使用饿了么插件包
// 使用VXETable
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
