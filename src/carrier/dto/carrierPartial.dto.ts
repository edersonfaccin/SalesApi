import { CarrierDto } from "./carrier.dto";
import { PartialType } from "@nestjs/mapped-types"

export class CarrierPartialDto extends PartialType(CarrierDto) {}