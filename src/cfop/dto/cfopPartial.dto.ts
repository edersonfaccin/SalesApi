import { CfopDto } from "./cfop.dto";
import { PartialType } from "@nestjs/mapped-types"

export class CfopPartialDto extends PartialType(CfopDto) {}