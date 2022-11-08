import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ListInput } from "src/common/dto/list.input";
import { BankService } from "./bank.service";
import { BankDto } from "./dto/bank.dto";
import { BankPartialDto } from "./dto/bankPartial.dto";
import { Bank } from "./entities/bank.entity";

@Resolver(() => Bank)
export class BankResolver {
    constructor(private readonly service: BankService) {}

    @Mutation(() => Bank)
    createBank(@Args('data') input: BankDto) {
        return this.service.create(input);
    }

    /* @Query(() => [Bank], { name: 'walletspage' })
    findAllPage(@Args('listBankInput') listBankInput: ListInput) {
        return this.service.findAll(listBankInput);
    }
 */
    @Query(() => [Bank], { name: 'banks' })
    findAll() {
        return this.service.findAll();
    }

    @Query(() => Bank, { name: 'bank' })
    findOne(@Args('id', { type: () => String }) id: string) {
        return this.service.findOne(id);
    }

    /* @Mutation(() => Bank)
    updateBank(@Args('data') input: BankPartialDto) {
        let oldData = this.service.findOne(input.id);

        return this.service.update(oldData, input);
    } */

    @Mutation(() => Bank)
    removeBank(@Args('id', { type: () => String }) id: string) {
        return this.service.delete(id);
    }
}