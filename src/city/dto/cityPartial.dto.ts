import { CityDto } from "./city.dto";
import { PartialType } from "@nestjs/mapped-types"

export class CityPartialDto extends PartialType(CityDto) {}