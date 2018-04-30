import $http from './axios'

export const getAllMoviesList = async (type, year, page = 0, limit = 10) => {
	try {
		let res = await $http({
			method: 'get',
			url: 'movies',
			params: {
				type,
				year,
				page,
				limit
			}
		})
		return res
	} catch (e) {
		console.error(e)
	}
}

export const getAllMoviesTypes = async () => {
	try {
		let res = await $http({
			method: 'get',
			url: 'movies/types'
		})
		return res
	} catch (e) {
		console.error(e);
	}
}

export const getMovieDetail = async (id) => {
	try {
		let res = await $http({
			method: 'get',
			url: 'movies/' + id
		})
		return res
	} catch (e) {
		console.error(e)
	}
}

export const login = async (username, password) => {
	try {
		let res = await $http({
			method: 'post',
			url: 'user/',
			data: {
				username,
				password
			}
		})
		return res
	} catch (e) {
		console.error(e)
	}
}
