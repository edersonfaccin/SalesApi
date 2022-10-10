import { PaymentConditionDto } from "./paymentCondition.dto";
import { PartialType } from "@nestjs/mapped-types"

export class PaymentConditionPartialDto extends PartialType(PaymentConditionDto) {}