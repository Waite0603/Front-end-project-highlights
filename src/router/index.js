import Vue from 'vue'
import VueRouter from 'vue-router'
import SetintervalView from '../views/SetintervalView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'IndexView',
		component: () => import('../views/IndexView.vue')
	},
	{
		path: '/bigData',
		name: 'SetintervalView',
		component: SetintervalView
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
