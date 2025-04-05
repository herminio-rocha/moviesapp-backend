import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MoviesModule } from './movies/movies.module';
import { join } from 'path';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot(),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
