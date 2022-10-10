import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { PaymentConditionInstallmentDto } from './dto/paymentConditionInstallment.dto';
import { PaymentConditionInstallmentPartialDto } from './dto/paymentConditionInstallmentPartial.dto';
import { PaymentConditionInstallment } from './entities/paymentConditionInstallment.entity';

@Injectable()
export class PaymentConditionInstallmentService {
    constructor(
        @Inject('PAYMENT_CONDITION_INSTALLMENT_REPOSITORY')
        private paymentConditionInstallmentRepository: Repository<PaymentConditionInstallment>,
    ) {}

    async findAll(): Promise<PaymentConditionInstallmentDto[]> {
        try {
            return this.paymentConditionInstallmentRepository.find({});
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<PaymentConditionInstallmentDto> {
        try {
            return await this.paymentConditionInstallmentRepository.findOne({ 
                where: { 
                    id: id 
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: PaymentConditionInstallmentDto): Promise<PaymentConditionInstallmentDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.paymentConditionInstallmentRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: PaymentConditionInstallmentDto, newValues: PaymentConditionInstallmentPartialDto): Promise<PaymentConditionInstallmentDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.paymentConditionInstallmentRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.paymentConditionInstallmentRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
