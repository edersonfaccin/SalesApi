import { SalerDto } from "./saler.dto";
import { PartialType } from "@nestjs/mapped-types"

export class SalerPartialDto extends PartialType(SalerDto) {}