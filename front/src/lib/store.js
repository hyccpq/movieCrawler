import Vuex from 'vuex'
import $http from './axios'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		movies: {}
	},
	
	actions:{
		getMoviesList({ commit, state }, { tag, page, limit } = {} ){
		
		}
	},
	
	mutations: {
	
	}
})