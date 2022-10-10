import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { SupplierBankAccountDto } from './dto/supplierBankAccount.dto';
import { SupplierBankAccountPartialDto } from './dto/supplierBankAccountPartial.dto';
import { SupplierBankAccount } from './entities/supplierBankAccount.entity';

@Injectable()
export class SupplierBankAccountService {
    constructor(
        @Inject('SUPPLIER_BANK_ACCOUNT_REPOSITORY') 
        private salerBankAccountRepository: Repository<SupplierBankAccount>
    ) {}

    async findAll(): Promise<SupplierBankAccountDto[]> {
        try {
            return this.salerBankAccountRepository.find({
                loadRelationIds: false,
                relations: [
                    'idbank'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<SupplierBankAccountDto> {
        try {
            return await this.salerBankAccountRepository.findOne({ 
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

    async findAllBySupplier(id: string): Promise<SupplierBankAccountDto[]> {
        try {
            let query = this.salerBankAccountRepository.createQueryBuilder('saler_bank_account')
            query.leftJoinAndSelect('saler_bank_account.idbank', 'bank')
            query.where(`saler_bank_account.idsaler = '${id}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async create(data: SupplierBankAccountDto): Promise<SupplierBankAccountDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.salerBankAccountRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: SupplierBankAccountDto, newValues: SupplierBankAccountPartialDto): Promise<SupplierBankAccountDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                //return await this.salerBankAccountRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.salerBankAccountRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
