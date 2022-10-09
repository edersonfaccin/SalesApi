import { IcmsTableDto } from "./icmsTable.dto";
import { PartialType } from "@nestjs/mapped-types"

export class IcmsTablePartialDto extends PartialType(IcmsTableDto) {}