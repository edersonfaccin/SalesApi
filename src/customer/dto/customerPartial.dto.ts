import { CustomerDto } from "./customer.dto";
import { PartialType } from "@nestjs/mapped-types"

export class CustomerPartialDto extends PartialType(CustomerDto) {}