import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { MovieService } from "../service/movie.service";
import { Movie } from "../dto/movie.dto";
import { PaginationInput } from "../dto/paginationInput.dto";
import { MoviesPaginated } from "../dto/moviesPaginated.dto";

@Resolver()
export class MovieResolver {

    constructor(private readonly movieService: MovieService) { }

    @Query(() => [Movie], { name: 'movies' })
    async movies(@Args('pagination', { type: () => PaginationInput }) pagination: PaginationInput) {
        return await this.movieService.getMovies(pagination);
    }

    @Query(() => Int, { name: 'totalMovies' })
    async getTotalMovies() {
        return await this.movieService.getTotalMovies();
    }

}   