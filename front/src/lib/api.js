import $http from './axios'

export const getAllMoviesList = async (type, year, page = 0, limit = 10) => {
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
}

export const getAllMoviesTypes = async () => {
	let res = await $http({
		method: 'get',
		url: 'movies/types'
	})
	return res
}

export const getMovieDetail = async (id) => {
	let res = await $http({
		method: 'get',
		url: 'movies/' + id
	})
	return res
}
