import { PartialType } from "@nestjs/mapped-types"
import { PaymentConditionInstallmentDto } from "./paymentConditionInstallment.dto";

export class PaymentConditionInstallmentPartialDto extends 
    PartialType(PaymentConditionInstallmentDto) {}