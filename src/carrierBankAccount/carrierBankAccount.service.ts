import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { CarrierBankAccountDto } from './dto/carrierBankAccount.dto';
import { CarrierBankAccountPartialDto } from './dto/carrierBankAccountPartial.dto';
import { CarrierBankAccount } from './entities/carrierBankAccount.entity';

@Injectable()
export class CarrierBankAccountService {
    constructor(
        @Inject('CARRIER_BANK_ACCOUNT_REPOSITORY') 
        private carrierBankAccountRepository: Repository<CarrierBankAccount>
    ) {}

    async findAll(): Promise<CarrierBankAccountDto[]> {
        try {
            return this.carrierBankAccountRepository.find({
                loadRelationIds: true,
                relations: [
                    'idbank'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CarrierBankAccountDto> {
        try {
            return await this.carrierBankAccountRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: true,
                relations: [
                    'idbank'
                ]
            })
        } catch (error) {
            return error;
        }
    }

    async findAllByCarrier(id: string): Promise<CarrierBankAccountDto[]> {
        try {
            let query = this.carrierBankAccountRepository.createQueryBuilder('carrier_bank_account')
            query.leftJoinAndSelect('carrier_bank_account.idbank', 'bank')
            query.where(`carrier_bank_account.idcarrier = '${id}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async create(data: CarrierBankAccountDto): Promise<CarrierBankAccountDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.carrierBankAccountRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CarrierBankAccountDto, newValues: CarrierBankAccountPartialDto): Promise<CarrierBankAccountDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                //return await this.carrierBankAccountRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.carrierBankAccountRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
