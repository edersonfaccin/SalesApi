import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { PaymentMethodDto } from './dto/paymentMethod.dto';
import { PaymentMethodPartialDto } from './dto/paymentMethodPartial.dto';
import { PaymentMethod } from './entities/paymentMethod.entity';

@Injectable()
export class PaymentMethodService {
    constructor(
        @Inject('PAYMENT_METHOD_REPOSITORY')
        private paymentMethodRepository: Repository<PaymentMethod>,
    ) {}

    async findAll(): Promise<PaymentMethodDto[]> {
        try {
            return this.paymentMethodRepository.find({});
        } catch (error) {
            return error;
        }
    }

    async findAllByCompany(idcompany: string): Promise<PaymentMethodDto[]> {
        try {
            let query = this.paymentMethodRepository.createQueryBuilder('company')
            query.where(`company.idcompany = '${idcompany}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<PaymentMethodDto> {
        try {
            return await this.paymentMethodRepository.findOne({ 
                where: { 
                    id: id 
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: PaymentMethodDto): Promise<PaymentMethodDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.paymentMethodRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: PaymentMethodDto, newValues: PaymentMethodPartialDto): Promise<PaymentMethodDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.paymentMethodRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.paymentMethodRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
