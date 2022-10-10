import { SupplierDto } from "./supplier.dto";
import { PartialType } from "@nestjs/mapped-types"

export class SupplierPartialDto extends PartialType(SupplierDto) {}