import { StateDto } from "./state.dto";
import { PartialType } from "@nestjs/mapped-types"

export class StatePartialDto extends PartialType(StateDto) {}