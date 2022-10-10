import { PartialType } from "@nestjs/mapped-types"
import { CustomerPixKeyDto } from "./customerPixKey.dto";

export class CustomerPixKeyPartialDto extends PartialType(CustomerPixKeyDto) {}