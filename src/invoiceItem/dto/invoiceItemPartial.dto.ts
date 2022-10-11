import { InvoiceItemDto } from "./invoiceItem.dto";
import { PartialType } from "@nestjs/mapped-types"

export class InvoiceItemPartialDto extends PartialType(InvoiceItemDto) {}