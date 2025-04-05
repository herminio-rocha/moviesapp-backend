import { Args, Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class MoviesResolver {

    @Query(() => String)
    movie(@Args('name', { nullable: true }) args?: string): string {
        return "movie";
    }
}   