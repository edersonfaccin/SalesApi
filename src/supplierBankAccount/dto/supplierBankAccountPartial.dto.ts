import { PartialType } from "@nestjs/mapped-types"
import { SupplierBankAccountDto } from "./supplierBankAccount.dto";

export class SupplierBankAccountPartialDto extends PartialType(SupplierBankAccountDto) {}