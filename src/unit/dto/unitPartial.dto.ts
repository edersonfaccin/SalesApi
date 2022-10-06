import { UnitDto } from "./unit.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UnitPartialDto extends PartialType(UnitDto) {}