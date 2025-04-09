import { Injectable } from "@nestjs/common";
import { MovieRepository } from "../repository/movie.repository";
import { PaginationInput } from "../dto/paginationInput.dto";
import { mapNeo4jRecordToMovie } from "../dto/movie.dto";
import { log } from "console";


@Injectable()
export class MovieService {

    constructor(private readonly movieRepository: MovieRepository) { }

    async getMovies(pagination: PaginationInput) {
        const records = (await this.movieRepository.findMovies(pagination));
        return records.records.map(mapNeo4jRecordToMovie);
    }

    async getTotalMovies() {
        return (await this.movieRepository.getTotalItems());
    }

}