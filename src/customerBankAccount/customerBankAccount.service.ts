import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CustomerBankAccountDto } from './dto/customerBankAccount.dto';
import { CustomerBankAccountPartialDto } from './dto/customerBankAccountPartial.dto';
import { CustomerBankAccount } from './entities/customerBankAccount.entity';

@Injectable()
export class CustomerBankAccountService {
    constructor(
        @Inject('CUSTOMER_BANK_ACCOUNT_REPOSITORY') 
        private customerBankAccountRepository: Repository<CustomerBankAccount>
    ) {}

    async findAll(): Promise<CustomerBankAccountDto[]> {
        try {
            return this.customerBankAccountRepository.find({
                loadRelationIds: false,
                relations: [
                    'idbank'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findAllByCompany(idcompany: string): Promise<CustomerBankAccountDto[]> {
        try {
            let query = this.customerBankAccountRepository.createQueryBuilder('company')
            query.where(`company.idcompany = '${idcompany}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CustomerBankAccountDto> {
        try {
            return await this.customerBankAccountRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: false,
                relations: [
                    'idbank'
                ]
            })
        } catch (error) {
            return error;
        }
    }

    async findAllByCustomer(id: string): Promise<CustomerBankAccountDto[]> {
        try {
            let query = this.customerBankAccountRepository.createQueryBuilder('customer_bank_account')
            query.leftJoinAndSelect('customer_bank_account.idbank', 'bank')
            query.where(`customer_bank_account.idcustomer = '${id}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async create(data: CustomerBankAccountDto): Promise<CustomerBankAccountDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.customerBankAccountRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CustomerBankAccountDto, newValues: CustomerBankAccountPartialDto): Promise<CustomerBankAccountDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                //return await this.customerBankAccountRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.customerBankAccountRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
