import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MovieDetails {
    @Field({ nullable: true })
    title: string;

    @Field()
    year: number;

    @Field(() => [String])
    directors: string[];

    @Field(() => [String])
    actors: string[];

}

export function mapNeo4jRecordToMovieDetails(record: any): MovieDetails {
    return {
        title: record.get('title'),
        year: record.get('year').low,
        directors: record.get('directors'),
        actors: record.get('actors'),
    };
}