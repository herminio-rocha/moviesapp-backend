import { Injectable } from "@nestjs/common";
import { Neo4jService } from "src/neo4j/service/neo4j.service";
import { PaginationInput } from "../dto/paginationInput.dto";
import { Integer } from "neo4j-driver";

@Injectable()
export class MovieRepository {

    constructor(private readonly neo4jService: Neo4jService) { }

    async findMovies(pagination: PaginationInput) {
        const query =
            `
                MATCH (m:Movie)<-[:DIRECTED]-(d:Person)
                RETURN m.title AS title, m.released AS year, collect(d.name) AS directors
                ORDER BY m.released DESC
                SKIP $offset
                LIMIT $limit
            `;
        const params = {
            offset: Integer.fromNumber(pagination.offset),
            limit: Integer.fromNumber(pagination.limit),
        }

        return await this.neo4jService.read(query, params);
    }

    async findMovieDetails(title: string) {
        const query =
            `
                MATCH (m:Movie {title: $title})
                OPTIONAL MATCH (m)<-[:DIRECTED]-(d:Person)
                OPTIONAL MATCH (a:Person)-[:ACTED_IN]->(m)
                RETURN m.title AS title, m.released AS year,
                        collect(DISTINCT d.name) AS directors,
                        collect(DISTINCT a.name) AS actors
            `;
        const params = { title };

        return await this.neo4jService.read(query, params);
    }

    async getTotalItems() {
        const query =
            `
                MATCH (m:Movie) RETURN count(m) as total
            `;

        const result = await this.neo4jService.read(query);
        return result.records[0].get('total').toNumber();
    }
}