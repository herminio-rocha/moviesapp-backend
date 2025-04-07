import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Neo4jService } from "../service/neo4j.service";
import { NEO4J_DRIVER } from "../util/neo4j.constants";
import { auth, driver, Driver } from "neo4j-driver";

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: NEO4J_DRIVER,
            inject: [ConfigService],
            useFactory: (configService: ConfigService): Driver => {
                const scheme = configService.get<string>('NEO4J_SCHEME', 'bolt');
                const host = configService.get<string>('NEO4J_HOST');
                const port = configService.get<string>('NEO4J_PORT', '7687');
                const username = configService.get<string>('NEO4J_USERNAME');
                const password = configService.get<string>('NEO4J_PASSWORD');
                const secure = configService.get<string>('NEO4J_SECURE') === 'true';

                const uri = `${scheme}://${host}:${port}`;

                return driver(
                    uri,
                    auth.basic(username ?? '', password ?? ''),
                    secure ? { encrypted: 'ENCRYPTION_ON' } : {}
                );
            }
        },
        Neo4jService
    ],
    exports: [Neo4jService, NEO4J_DRIVER]
})
export class Neo4jModule { }