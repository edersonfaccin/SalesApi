import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { InvoiceItemDto } from './dto/invoiceItem.dto';
import { InvoiceItemPartialDto } from './dto/invoiceItemPartial.dto';
import { InvoiceItem } from './entities/invoiceItem.entity';

@Injectable()
export class InvoiceItemService {
    constructor(
        @Inject('INVOICE_ITEM_REPOSITORY')
        private invoiceItemRepository: Repository<InvoiceItem>,
    ) {}

    async findAll(): Promise<InvoiceItemDto[]> {
        try {
            return this.invoiceItemRepository.find({
                loadRelationIds: false,
                relations: [
                    'idproduct'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<InvoiceItemDto> {
        try {
            return await this.invoiceItemRepository.findOne({ 
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
    
    async create(data: InvoiceItemDto): Promise<InvoiceItemDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.invoiceItemRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: InvoiceItemDto, newValues: InvoiceItemPartialDto): Promise<InvoiceItemDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.invoiceItemRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.invoiceItemRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
