import { ProductDto } from "./product.dto";
import { PartialType } from "@nestjs/mapped-types"

export class ProductPartialDto extends PartialType(ProductDto) {}