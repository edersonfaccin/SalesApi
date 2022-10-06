import { CategoryDto } from "./category.dto";
import { PartialType } from "@nestjs/mapped-types"

export class CategoryPartialDto extends PartialType(CategoryDto) {}