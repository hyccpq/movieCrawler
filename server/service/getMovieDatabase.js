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

export const getMovieTypes = async () => {
	try {
		let movieTypes = []
		const movies = await GetMovieDatabase.find()
		movies.forEach(item => {
			let type = item.movieTypes
			for(let i = 0; i < type.length; i++){
				if(movieTypes.indexOf(type[i]) === -1){
					movieTypes.push(type[i])
				}
			}
		})
		return {
			movieTypes
		}
	} catch (e) {
		console.log(e);
	}
}