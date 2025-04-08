import { Field, InputType, Int } from "@nestjs/graphql";
import { Min } from "class-validator";

@InputType()
export class PaginationInput {
    @Field(() => Int)
    @Min(0)
    offset: number = 0;

    @Field(() => Int)
    @Min(1)
    limit: number = 10;
}