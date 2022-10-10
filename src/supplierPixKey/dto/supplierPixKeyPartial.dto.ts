import { PartialType } from "@nestjs/mapped-types"
import { SupplierPixKeyDto } from "./supplierPixKey.dto";

export class SupplierPixKeyPartialDto extends PartialType(SupplierPixKeyDto) {}