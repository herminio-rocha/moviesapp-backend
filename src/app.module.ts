import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MovieModule } from './movies/module/movie.module';
import { join } from 'path';
import { Neo4jModule } from './neo4j/module/neo4j.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MovieModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      path: '/api/graphql',
      formatError: (error) => ({
        message: error.message,
        code: error.extensions?.code || 'INTERNAL_ERROR',
        timestamp: new Date().toISOString(),
      }),
    }),
    Neo4jModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
