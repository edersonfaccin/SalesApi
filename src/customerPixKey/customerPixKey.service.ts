import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CustomerPixKeyDto } from './dto/customerPixKey.dto';
import { CustomerPixKeyPartialDto } from './dto/customerPixKeyPartial.dto';
import { CustomerPixKey } from './entities/customerPixKey.entity';

@Injectable()
export class CustomerPixKeyService {
    constructor(
        @Inject('CUSTOMER_PIX_KEY_REPOSITORY') 
        private customerPixKeyRepository: Repository<CustomerPixKey>
    ) {}

    async findAll(): Promise<CustomerPixKeyDto[]> {
        try {
            return this.customerPixKeyRepository.find({
                loadRelationIds: false
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CustomerPixKeyDto> {
        try {
            return await this.customerPixKeyRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: false
            })
        } catch (error) {
            return error;
        }
    }

    async findAllByCustomer(id: string): Promise<CustomerPixKeyDto[]> {
        try {
            let query = this.customerPixKeyRepository.createQueryBuilder('customer_pix_key')
            query.where(`customer_pix_key.idcustomer = '${id}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }
    
    async create(data: CustomerPixKeyDto): Promise<CustomerPixKeyDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.customerPixKeyRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CustomerPixKeyDto, newValues: CustomerPixKeyPartialDto): Promise<CustomerPixKeyDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.customerPixKeyRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.customerPixKeyRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
