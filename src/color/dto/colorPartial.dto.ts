import { ColorDto } from "./color.dto";
import { PartialType } from "@nestjs/mapped-types"

export class ColorPartialDto extends PartialType(ColorDto) {}