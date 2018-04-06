import { getAllMovies,getMovieDet} from '../service/movie'
import { controller, get } from '../lib/decorator'

@controller('/api/v0/movies')
export class movieController {
	@get('/')
	async getMovies (ctx, next) {
		const { type, year } = ctx.query
		const movies = await getAllMovies(type, year)
		ctx.body = {
			movies
		}
	}
	
	@get('/:id')
	async getMovieDetail (ctx, next) {
		const id = ctx.params.id
		const movies = await getMovieDet(id)
		ctx.body = {
			movies
		}
	}
}