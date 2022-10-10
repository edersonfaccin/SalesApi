import { PartialType } from "@nestjs/mapped-types"
import { SalerBankAccountDto } from "./salerBankAccount.dto";

export class SalerBankAccountPartialDto extends PartialType(SalerBankAccountDto) {}