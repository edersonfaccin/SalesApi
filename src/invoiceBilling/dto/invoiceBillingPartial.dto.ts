import { InvoiceBillingDto } from "./invoiceBilling.dto";
import { PartialType } from "@nestjs/mapped-types"

export class InvoiceBillingPartialDto extends PartialType(InvoiceBillingDto) {}