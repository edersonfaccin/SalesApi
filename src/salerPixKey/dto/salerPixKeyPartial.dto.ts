import { PartialType } from "@nestjs/mapped-types"
import { SalerPixKeyDto } from "./salerPixKey.dto";

export class SalerPixKeyPartialDto extends PartialType(SalerPixKeyDto) {}