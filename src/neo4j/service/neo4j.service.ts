import { Inject, OnApplicationShutdown } from "@nestjs/common";
import { NEO4J_DRIVER } from "../util/neo4j.constants";
import { Driver, Result, session, Session } from "neo4j-driver";

export class Neo4jService implements OnApplicationShutdown {
    constructor(
        @Inject(NEO4J_DRIVER) private readonly driver: Driver
    ) { }

    async onApplicationShutdown(signal: string) {
        await this.driver.close();
    }

    private getSession(database?: string): Session {
        return this.driver.session({
            database: database || 'neo4j',
            defaultAccessMode: session.READ,
        });
    }

    async read(
        cypher: string,
        params?: Record<string, any>,
        database?: string,
    ) {
        const session = this.getSession(database);
        const result = await session.run(cypher, params);
        session.close();

        return result;
    }
}