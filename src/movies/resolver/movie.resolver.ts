import { Args, Query, Resolver } from "@nestjs/graphql";
import { MovieService } from "../service/movie.service";
import { MovieDetails } from "../dto/movieDetails.dto";

@Resolver()
export class MovieResolver {

    constructor(private readonly movieService: MovieService) { }

    @Query(() => MovieDetails, { name: 'movieDetails' })
    async movieDetails(@Args('title') title: string) {
        return await this.movieService.movieDetails(title);
    }
}   