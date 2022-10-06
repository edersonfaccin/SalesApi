import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { CategoryPartialDto } from './dto/categoryPartial.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<CategoryDto[]> {
        try {
            return this.categoryRepository.find({
                loadRelationIds: true,
                relations: [
                    'idcompany'
                ],
                select: {
                    id: true,
                    name: true
                }
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CategoryDto> {
        try {
            return await this.categoryRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: true,
                relations: [
                    'idcompany'
                ],
                select: {
                    id: true,
                    name: true
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: CategoryDto): Promise<CategoryDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.categoryRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CategoryDto, newValues: CategoryPartialDto): Promise<CategoryDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.categoryRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.categoryRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
