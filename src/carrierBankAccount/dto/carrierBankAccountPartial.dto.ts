import { PartialType } from "@nestjs/mapped-types"
import { CarrierBankAccountDto } from "./carrierBankAccount.dto";

export class CarrierBankAccountPartialDto extends PartialType(CarrierBankAccountDto) {}