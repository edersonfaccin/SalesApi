import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BankDto {

    @Field(() => String, { description: 'Informe a companhia' })
    idcompany?: string

    @Field(() => String, { description: 'Informe o codigo do banco' })
    bank_number?: string

    @Field(() => String, { description: 'Informe o Nome' })
    name?: string

    @Field(() => Boolean, { description: '', nullable: true })
    active?: boolean
}