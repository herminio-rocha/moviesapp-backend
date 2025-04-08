import { Args, Query, Resolver } from "@nestjs/graphql";
import { MovieService } from "../service/movie.service";
import { MovieDetails } from "../dto/movieDetails.dto";
import { Movie } from "../dto/movie.dto";
import { PaginationInput } from "../dto/paginationInput.dto";

@Resolver()
export class MovieResolver {

    constructor(private readonly movieService: MovieService) { }

    @Query(() => [Movie], { name: 'movie' })
    async movies(@Args('pagination', { type: () => PaginationInput }) pagination: PaginationInput) {
        return await this.movieService.movies(pagination);
    }

    @Query(() => MovieDetails, { name: 'movieDetails' })
    async movieDetails(@Args('title') title: string) {
        return await this.movieService.movieDetails(title);
    }
}   