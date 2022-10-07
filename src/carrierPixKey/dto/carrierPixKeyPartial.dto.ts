import { PartialType } from "@nestjs/mapped-types"
import { CarrierPixKeyDto } from "./carrierPixKey.dto";

export class CarrierPixKeyPartialDto extends PartialType(CarrierPixKeyDto) {}