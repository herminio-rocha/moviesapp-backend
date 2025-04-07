import { Module } from "@nestjs/common";
import { MovieResolver } from "../resolver/movie.resolver";
import { MovieService } from "../service/movie.service";
import { MovieRepository } from "../repository/movie.repository";
import { Neo4jModule } from "src/neo4j/module/neo4j.module";


@Module({
    imports: [Neo4jModule],
    providers: [MovieResolver, MovieService, MovieRepository],
    exports: []
})
export class MovieModule { }