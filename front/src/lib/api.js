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
