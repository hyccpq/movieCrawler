import Vue from 'vue'
import App from './App'
import router from './lib/router'

new Vue({
	el:'#app',
	render: h => h(App),
	router
})