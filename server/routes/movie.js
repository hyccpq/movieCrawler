import mongoose from 'mongoose'
import { get, post, put, controller } from '../lib/decorator'

@controller('/api/v0/movies')
export class movieController {
	@get('/')
	async getMovies (ctx, next) {
		const Movie = mongoose.model('Movie')
		try{
			const movies = await Movie.find().sort({
				'meta.createdAt' : -1
			})
			ctx.body = {
				movies
			}
		} catch (e) {
			console.log(e);
		}
	}
	
	@get('/:id')
	async  getMovieDetail (ctx, next) {
		const Movie = mongoose.model('Movie')
		const id = ctx.params.id
		try{
			const movies = await Movie.findOne({_id : id})
			ctx.body = {
				movies
			}
		} catch (e) {
			console.log(e);
		}
	}
}