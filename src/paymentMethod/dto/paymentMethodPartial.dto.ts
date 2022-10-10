import { PaymentMethodDto } from "./paymentMethod.dto";
import { PartialType } from "@nestjs/mapped-types"

export class PaymentMethodPartialDto extends PartialType(PaymentMethodDto) {}