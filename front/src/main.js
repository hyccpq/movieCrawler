import Vue from 'vue'
import App from './App'
import router from './lib/router'
import store from './lib/store'

new Vue({
	el:'#app',
	render: h => h(App),
	router,
	store,
	template:'<App/>',
	components: {App}
})