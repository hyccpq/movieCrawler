import Vue from 'vue'
import Vuex from 'vuex'
import * as movieApi from './api'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		movies: {},
		movieTypes:[],
		movieDetail: {}
	},
	
	actions:{
		async getMoviesList({ commit }, { type, year, page, limit } = {} ){
			let res = await movieApi.getAllMoviesList(type, year, page, limit)
			commit('GET_ALL_MOVIES', res)
			return res
		},
		async getMoviesTypes({ commit }){
			let res = await movieApi.getAllMoviesTypes()
			commit('GET_MOVIE_TYPES', res)
			return res
		},
		async getMovieDetail({ commit }, { id }) {
			let res = await movieApi.getMovieDetail(id)
			commit('GET_MOVIE_DETAILS', res)
		}
	}
	
	,
	
	mutations: {
		GET_ALL_MOVIES(state, { data }) {
			state.movies = data
		},
		GET_MOVIE_TYPES(state, { data }) {
			state.movieTypes = data.types.movieTypes
		}
	}
})