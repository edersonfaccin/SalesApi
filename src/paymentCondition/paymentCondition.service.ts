import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { PaymentConditionInstallmentService } from 'src/paymentConditionInstallment/paymentConditionInstallment.service';
import { Repository } from 'typeorm';
import { PaymentConditionDto } from './dto/paymentCondition.dto';
import { PaymentConditionPartialDto } from './dto/paymentConditionPartial.dto';
import { PaymentCondition } from './entities/paymentCondition.entity';

@Injectable()
export class PaymentConditionService {
    constructor(
        @Inject('PAYMENT_CONDITION_REPOSITORY')
        private paymentConditionRepository: Repository<PaymentCondition>,
        private readonly paymentConditionInstallmentService: PaymentConditionInstallmentService
    ) {}

    async findAll(): Promise<PaymentConditionDto[]> {
        try {
            return this.paymentConditionRepository.find({});
        } catch (error) {
            return error;
        }
    }

    async findAllByCompany(idcompany: string): Promise<PaymentConditionDto[]> {
        try {
            let query = this.paymentConditionRepository.createQueryBuilder('company')
            query.where(`company.idcompany = '${idcompany}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<PaymentConditionDto> {
        try {
            return await this.paymentConditionRepository.findOne({ 
                where: { 
                    id: id 
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: PaymentConditionDto): Promise<PaymentConditionDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                let dataPaymentCondition = await this.paymentConditionRepository.save(data)
                const promises = []

                data.installments.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idpayment_condition: dataPaymentCondition.id,
                        percent: item.percent,
                        days: item.days
                    }
                    promises.push(this.paymentConditionInstallmentService.create(newItem))
                })

                Promise.all(promises).then((_) => {
                    return dataPaymentCondition
                }).catch(error => {
                    throw new Error(error);
                })
                
                return dataPaymentCondition
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: PaymentConditionDto, newValues: PaymentConditionPartialDto): Promise<PaymentConditionDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.paymentConditionRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.paymentConditionRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
