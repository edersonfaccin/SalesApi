import { OrderDto } from "./order.dto";
import { PartialType } from "@nestjs/mapped-types"

export class OrderPartialDto extends PartialType(OrderDto) {}