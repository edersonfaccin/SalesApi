import { InvoiceDto } from "./invoice.dto";
import { PartialType } from "@nestjs/mapped-types"

export class InvoicePartialDto extends PartialType(InvoiceDto) {}