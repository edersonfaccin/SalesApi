import { PartialType } from "@nestjs/mapped-types"
import { CustomerBankAccountDto } from "./customerBankAccount.dto";

export class CustomerBankAccountPartialDto extends PartialType(CustomerBankAccountDto) {}