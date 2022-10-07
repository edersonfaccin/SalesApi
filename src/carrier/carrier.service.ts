import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { CarrierBankAccount } from 'src/carrierBankAccount/entities/carrierBankAccount.entity';
import { CarrierPixKey } from 'src/carrierPixKey/entities/carrierPixKey.entity';
import { Repository } from 'typeorm';
import { CarrierDto } from './dto/carrier.dto';
import { CarrierPartialDto } from './dto/carrierPartial.dto';
import { Carrier } from './entities/carrier.entity';

@Injectable()
export class CarrierService {
    constructor(
        @Inject('CARRIER_REPOSITORY') 
        private carrierRepository: Repository<Carrier>,
        @Inject('CARRIER_BANK_ACCOUNT_REPOSITORY') 
        private carrierBankAccountRepository: Repository<CarrierBankAccount>,
        @Inject('CARRIER_PIX_KEY_REPOSITORY')
        private carrierPixKeyRepository: Repository<CarrierPixKey>
    ) {}

    async findAll(): Promise<CarrierDto[]> {
        try {
            return this.carrierRepository.find({
                loadRelationIds: true,
                relations: [
                    'idcity'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CarrierDto> {
        try {
            return await this.carrierRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: true,
                relations: [
                    'idcity'
                ]
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: CarrierDto): Promise<CarrierDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                let dataCarrier = await this.carrierRepository.save(data)
                const promises = []

                data.accounts.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idcarrier: dataCarrier.id,
                        idbank: item.idbank,
                        agency_number: item.agency_number,
                        account_number: item.account_number,
                        type_account: item.type_account
                    }
                    promises.push(this.carrierBankAccountRepository.save(newItem))
                })

                data.pix_keys.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idcarrier: dataCarrier.id,
                        key: item.key
                    }

                    promises.push(this.carrierPixKeyRepository.save(newItem))
                })

                Promise.all(promises).then((_) => {
                    return dataCarrier
                }).catch(error => {
                    throw new Error(error);
                })
                
                return dataCarrier
                //return this.carrierRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CarrierDto, newValues: CarrierPartialDto): Promise<CarrierDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.carrierRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.carrierRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
