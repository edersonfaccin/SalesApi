import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { SalerBankAccountService } from 'src/salerBankAccount/salerBankAccount.service';
import { SalerPixKeyService } from 'src/salerPixKey/salerPixKey.service';
import { Repository } from 'typeorm';
import { SalerDto } from './dto/saler.dto';
import { SalerPartialDto } from './dto/salerPartial.dto';
import { Saler } from './entities/saler.entity';

@Injectable()
export class SalerService {
    constructor(
        @Inject('SALER_REPOSITORY') 
        private salerRepository: Repository<Saler>,
        private readonly salerBankAccountService: SalerBankAccountService,
        private readonly salerPixKeyService: SalerPixKeyService
    ) {}

    async findAll(): Promise<SalerDto[]> {
        try {
            return this.salerRepository.find({
                loadRelationIds: false,
                relations: [
                    'idcity'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<SalerDto> {
        try {
            return await this.salerRepository.findOne({ 
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
    
    async create(data: SalerDto): Promise<SalerDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                let dataSaler = await this.salerRepository.save(data)
                const promises = []

                data.accounts.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idsaler: dataSaler.id,
                        idbank: item.idbank,
                        agency_number: item.agency_number,
                        account_number: item.account_number,
                        type_account: item.type_account
                    }
                    promises.push(this.salerBankAccountService.create(newItem))
                })

                data.pix_keys.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idsaler: dataSaler.id,
                        key: item.key
                    }

                    promises.push(this.salerPixKeyService.create(newItem))
                })

                Promise.all(promises).then((_) => {
                    return dataSaler
                }).catch(error => {
                    throw new Error(error);
                })
                
                return dataSaler
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: SalerDto, newValues: SalerPartialDto): Promise<SalerDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.salerRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.salerRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
