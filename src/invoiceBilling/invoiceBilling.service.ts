import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { InvoiceBillingDto } from './dto/invoiceBilling.dto';
import { InvoiceBillingPartialDto } from './dto/invoiceBillingPartial.dto';
import { InvoiceBilling } from './entities/invoiceBilling.entity';

@Injectable()
export class InvoiceBillingService {
    constructor(
        @Inject('INVOICE_BILLING_REPOSITORY')
        private invoiceBillingRepository: Repository<InvoiceBilling>,
    ) {}

    async findAll(): Promise<InvoiceBillingDto[]> {
        try {
            return this.invoiceBillingRepository.find({
                loadRelationIds: false,
                relations: [
                    'idpayment_method'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<InvoiceBillingDto> {
        try {
            return await this.invoiceBillingRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: false,
                relations: [
                    'idpayment_method'
                ]
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: InvoiceBillingDto): Promise<InvoiceBillingDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.invoiceBillingRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: InvoiceBillingDto, newValues: InvoiceBillingPartialDto): Promise<InvoiceBillingDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.invoiceBillingRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.invoiceBillingRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
