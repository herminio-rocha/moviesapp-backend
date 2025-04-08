import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { MovieService } from "../service/movie.service";
import { MovieDetails } from "../dto/movieDetails.dto";
import { Movie } from "../dto/movie.dto";
import { PaginationInput } from "../dto/paginationInput.dto";
import { MoviesPaginated } from "../dto/moviesPaginated.dto";

@Resolver()
export class MovieResolver {

    constructor(private readonly movieService: MovieService) { }

    @Query(() => [Movie], { name: 'moviesPaginated' })
    async moviesPaginated(@Args('pagination', { type: () => PaginationInput }) pagination: PaginationInput) {
        return await this.movieService.getMoviesPaginated(pagination);
    }

    @Query(() => Int, { name: 'moviesTotal' })
    async getTotalMovies() {
        return await this.movieService.getTotalMovies();
    }

    @Query(() => MovieDetails, { name: 'movieDetails' })
    async movieDetails(@Args('title') title: string) {
        return await this.movieService.getMovieDetails(title);
    }
}   