import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { CarrierBankAccountService } from 'src/carrierBankAccount/carrierBankAccount.service';
import { CarrierPixKeyService } from 'src/carrierPixKey/carrierPixKey.service';
import { Repository } from 'typeorm';
import { CarrierDto } from './dto/carrier.dto';
import { CarrierPartialDto } from './dto/carrierPartial.dto';
import { Carrier } from './entities/carrier.entity';

@Injectable()
export class CarrierService {
    constructor(
        @Inject('CARRIER_REPOSITORY') 
        private carrierRepository: Repository<Carrier>,
        private readonly carrierBankAccountService: CarrierBankAccountService,
        private readonly carrierPixKeyService: CarrierPixKeyService
    ) {}

    async findAll(): Promise<CarrierDto[]> {
        try {
            return this.carrierRepository.find({
                loadRelationIds: false,
                relations: [
                    'idcity'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findAllByCompany(idcompany: string): Promise<CarrierDto[]> {
        try {
            let query = this.carrierRepository.createQueryBuilder('company')
            query.where(`company.idcompany = '${idcompany}'`)

            return query.getMany()
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
                loadRelationIds: false,
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
                    promises.push(this.carrierBankAccountService.create(newItem))
                })

                data.pix_keys.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idcarrier: dataCarrier.id,
                        key: item.key
                    }

                    promises.push(this.carrierPixKeyService.create(newItem))
                })

                Promise.all(promises).then((_) => {
                    return dataCarrier
                }).catch(error => {
                    throw new Error(error);
                })
                
                return dataCarrier
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
