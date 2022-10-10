import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { CustomerBankAccountService } from 'src/customerBankAccount/customerBankAccount.service';
import { CustomerPixKeyService } from 'src/customerPixKey/customerPixKey.service';
import { Repository } from 'typeorm';
import { CustomerDto } from './dto/customer.dto';
import { CustomerPartialDto } from './dto/customerPartial.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_REPOSITORY') 
        private customerRepository: Repository<Customer>,
        private readonly customerBankAccountService: CustomerBankAccountService,
        private readonly customerPixKeyService: CustomerPixKeyService
    ) {}

    async findAll(): Promise<CustomerDto[]> {
        try {
            return this.customerRepository.find({
                loadRelationIds: false,
                relations: [
                    'idcity'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CustomerDto> {
        try {
            return await this.customerRepository.findOne({ 
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
    
    async create(data: CustomerDto): Promise<CustomerDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                let dataCustomer = await this.customerRepository.save(data)
                const promises = []

                data.accounts.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idcustomer: dataCustomer.id,
                        idbank: item.idbank,
                        agency_number: item.agency_number,
                        account_number: item.account_number,
                        type_account: item.type_account
                    }
                    promises.push(this.customerBankAccountService.create(newItem))
                })

                data.pix_keys.map(item => {
                    let newItem = {
                        idcompany: item.idcompany,
                        idcustomer: dataCustomer.id,
                        key: item.key
                    }

                    promises.push(this.customerPixKeyService.create(newItem))
                })

                Promise.all(promises).then((_) => {
                    return dataCustomer
                }).catch(error => {
                    throw new Error(error);
                })
                
                return dataCustomer
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CustomerDto, newValues: CustomerPartialDto): Promise<CustomerDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.customerRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.customerRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
