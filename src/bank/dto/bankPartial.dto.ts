import { BankDto } from "./bank.dto";
import { PartialType } from "@nestjs/mapped-types"
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class BankPartialDto extends PartialType(BankDto) {
    @Field(() => String, { nullable: true })
    id: string;
}