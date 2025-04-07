import { Injectable } from "@nestjs/common";
import { MovieRepository } from "../repository/movie.repository";
import { mapNeo4jRecordToMovieDetails } from "../dto/movieDetails.dto";


@Injectable()
export class MovieService {

    constructor(private readonly movieRepository: MovieRepository) { }

    async movieDetails(title: string) {
        const record = await this.movieRepository.findMovieDetails(title);
        return record.records.map(mapNeo4jRecordToMovieDetails)[0];
    }
}