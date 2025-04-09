import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Movie {
    @Field()
    title: string;

    @Field()
    year: number;

    @Field(() => [String])
    directors: string[];

    @Field(() => [String])
    actors: string[];
}

export function mapNeo4jRecordToMovie(record: any): Movie {
    return {
        title: record.get('title'),
        year: record.get('year').low,
        directors: record.get('directors'),
        actors: record.get('actors'),
    };
}