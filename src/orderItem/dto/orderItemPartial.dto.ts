import { OrderItemDto } from "./orderItem.dto";
import { PartialType } from "@nestjs/mapped-types"

export class OrderItemPartialDto extends PartialType(OrderItemDto) {}