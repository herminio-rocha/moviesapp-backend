import { Injectable } from "@nestjs/common";
import { MovieRepository } from "../repository/movie.repository";
import { mapNeo4jRecordToMovieDetails } from "../dto/movieDetails.dto";
import { PaginationInput } from "../dto/paginationInput.dto";
import { mapNeo4jRecordToMovie } from "../dto/movie.dto";


@Injectable()
export class MovieService {

    constructor(private readonly movieRepository: MovieRepository) { }

    async movies(pagination: PaginationInput) {
        const records = await this.movieRepository.findMovies(pagination);
        return records.records.map(mapNeo4jRecordToMovie);
    }

    async movieDetails(title: string) {
        const record = await this.movieRepository.findMovieDetails(title);
        return record.records.map(mapNeo4jRecordToMovieDetails)[0];
    }
}