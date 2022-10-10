import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { SupplierBankAccountService } from 'src/supplierBankAccount/supplierBankAccount.service';
import { SupplierPixKeyService } from 'src/supplierPixKey/supplierPixKey.service';
import { Repository } from 'typeorm';
import { SupplierDto } from './dto/supplier.dto';
import { SupplierPartialDto } from './dto/supplierPartial.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
    constructor(
        @Inject('SUPPLIER_REPOSITORY') 
        private supplierRepository: Repository<Supplier>,
        private readonly supplierBankAccountService: SupplierBankAccountService,
        private readonly supplierPixKeyService: SupplierPixKeyService
    ) {}

    async findAll(): Promise<SupplierDto[]> {
        try {
            return this.supplierRepository.find({
                loadRelationIds: false,
                relations: [
                    'idcity'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<SupplierDto> {
        try {
            return await this.supplierRepository.findOne({ 
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
    
    async create(data: SupplierDto): Promise<SupplierDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                let dataSupplier = await this.supplierRepository.save(data)
                const promises = []

                data.accounts.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idsupplier: dataSupplier.id,
                        idbank: item.idbank,
                        agency_number: item.agency_number,
                        account_number: item.account_number,
                        type_account: item.type_account
                    }
                    promises.push(this.supplierBankAccountService.create(newItem))
                })

                data.pix_keys.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idsupplier: dataSupplier.id,
                        key: item.key
                    }

                    promises.push(this.supplierPixKeyService.create(newItem))
                })

                Promise.all(promises).then((_) => {
                    return dataSupplier
                }).catch(error => {
                    throw new Error(error);
                })
                
                return dataSupplier
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: SupplierDto, newValues: SupplierPartialDto): Promise<SupplierDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.supplierRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.supplierRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
