import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { OrderItemDto } from './dto/orderItem.dto';
import { OrderItemPartialDto } from './dto/orderItemPartial.dto';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrderItemService {
    constructor(
        @Inject('ORDER_ITEM_REPOSITORY')
        private orderItemRepository: Repository<OrderItem>,
    ) {}

    async findAll(): Promise<OrderItemDto[]> {
        try {
            return this.orderItemRepository.find({
                loadRelationIds: false,
                relations: [
                    'idproduct'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<OrderItemDto> {
        try {
            return await this.orderItemRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: false,
                relations: [
                    'idproduct'
                ]
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: OrderItemDto): Promise<OrderItemDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.orderItemRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: OrderItemDto, newValues: OrderItemPartialDto): Promise<OrderItemDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.orderItemRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.orderItemRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
