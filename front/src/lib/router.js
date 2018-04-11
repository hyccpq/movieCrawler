import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import('../components/home')
const detail = () => import('../components/detail')

export default new Router({
	mode: 'history',
	routes:[
		{
			path: '/',
			name: '首页',
			component: home,
		},
		{
			path: '/detail/:id',
			name: '详情页面',
			component: detail
		}
	]
})