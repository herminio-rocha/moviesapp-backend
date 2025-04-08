import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Movie } from "./movie.dto";

@ObjectType()
export class MoviesPaginated {
    @Field(() => [Movie])
    items: Movie[];

    @Field(() => Int)
    total: number;
}