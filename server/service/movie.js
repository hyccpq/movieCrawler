import mongoose from 'mongoose'

const Movie = mongoose.model('Movie')

export const getAllMovies = async (type, year) => {
	let query = {}
	if(type) {
		query.movieTypes = {
			$in: [type]
		}
	}
	if(year) {
		query.year = year
	}
	try{
		const movies = await Movie.find(query)
		
		return movies
	} catch (e) {
		console.log(e);
	}
}

export const getMovieDet = async (id) => {
	try{
		const movies = await Movie.find({_id:id})
		
		return movies
	} catch (e) {
		console.log(e);
	}
}