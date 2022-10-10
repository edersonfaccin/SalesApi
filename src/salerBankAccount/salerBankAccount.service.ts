import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { SalerBankAccountDto } from './dto/salerBankAccount.dto';
import { SalerBankAccountPartialDto } from './dto/salerBankAccountPartial.dto';
import { SalerBankAccount } from './entities/salerBankAccount.entity';

@Injectable()
export class SalerBankAccountService {
    constructor(
        @Inject('SALER_BANK_ACCOUNT_REPOSITORY') 
        private salerBankAccountRepository: Repository<SalerBankAccount>
    ) {}

    async findAll(): Promise<SalerBankAccountDto[]> {
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

    async findOne(id: string): Promise<SalerBankAccountDto> {
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

    async findAllBySaler(id: string): Promise<SalerBankAccountDto[]> {
        try {
            let query = this.salerBankAccountRepository.createQueryBuilder('saler_bank_account')
            query.leftJoinAndSelect('saler_bank_account.idbank', 'bank')
            query.where(`saler_bank_account.idsaler = '${id}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async create(data: SalerBankAccountDto): Promise<SalerBankAccountDto> {
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
    
    async update(oldData: SalerBankAccountDto, newValues: SalerBankAccountPartialDto): Promise<SalerBankAccountDto> {
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
