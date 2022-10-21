import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductPartialDto } from './dto/productPartial.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) {}

    async findAll(): Promise<ProductDto[]> {
        try {
            return this.productRepository.find({});
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<ProductDto> {
        try {
            return await this.productRepository.findOne({ 
                where: { 
                    id: id 
                }
            })
        } catch (error) {
            return error;
        }
    }

    async findAllByCompany(idcompany: string): Promise<ProductDto[]> {
        try {
            let query = this.productRepository.createQueryBuilder('product')
            query.leftJoinAndSelect('product.idcategory', 'category')
            query.leftJoinAndSelect('product.idcolor', 'color')
            query.leftJoinAndSelect('product.idunit', 'unit')
            query.where(`product.idcompany = '${idcompany}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }
    
    async create(data: ProductDto): Promise<ProductDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.productRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: ProductDto, newValues: ProductPartialDto): Promise<ProductDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.productRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.productRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
