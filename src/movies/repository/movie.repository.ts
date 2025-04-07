import { Injectable } from "@nestjs/common";
import { Neo4jService } from "src/neo4j/service/neo4j.service";

@Injectable()
export class MovieRepository {

    constructor(private readonly neo4jService: Neo4jService) { }

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
        const params = title ? { title } : {};

        return await this.neo4jService.read(query, params);
    }
}