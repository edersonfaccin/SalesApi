import { CountryDto } from "./country.dto";
import { PartialType } from "@nestjs/mapped-types"

export class CountryPartialDto extends PartialType(CountryDto) {}