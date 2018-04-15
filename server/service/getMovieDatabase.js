import mongoose from 'mongoose'

const GetMovieDatabase = mongoose.model('Movie')

export const getAllMovies = async (type, year, limit = 10, skip = 0) => {
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
		const movies = await GetMovieDatabase.find(query).limit(limit).skip(skip)
		
		return movies
	} catch (e) {
		console.log(e);
	}
}

export const getMovieDet = async (id) => {
	try{
		const movies = await GetMovieDatabase.findOne({_id:id})
		
		return movies
	} catch (e) {
		console.log(e);
	}
}

export const getRelativeMoives = async (movie) => {
	try{
		const movies = await GetMovieDatabase.find({
			movieTypes: {
				$in: movie.movieTypes
			}
		})
		
		return movies
	} catch (e) {
		console.log(e);
	}
}