import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { SupplierPixKeyDto } from './dto/supplierPixKey.dto';
import { SupplierPixKeyPartialDto } from './dto/supplierPixKeyPartial.dto';
import { SupplierPixKey } from './entities/supplierPixKey.entity';

@Injectable()
export class SupplierPixKeyService {
    constructor(
        @Inject('SUPPLIER_PIX_KEY_REPOSITORY') 
        private supplierPixKeyRepository: Repository<SupplierPixKey>
    ) {}

    async findAll(): Promise<SupplierPixKeyDto[]> {
        try {
            return this.supplierPixKeyRepository.find({
                loadRelationIds: false
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<SupplierPixKeyDto> {
        try {
            return await this.supplierPixKeyRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: false
            })
        } catch (error) {
            return error;
        }
    }

    async findAllBySupplier(id: string): Promise<SupplierPixKeyDto[]> {
        try {
            let query = this.supplierPixKeyRepository.createQueryBuilder('supplier_pix_key')
            query.where(`supplier_pix_key.idsupplier = '${id}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }
    
    async create(data: SupplierPixKeyDto): Promise<SupplierPixKeyDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.supplierPixKeyRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: SupplierPixKeyDto, newValues: SupplierPixKeyPartialDto): Promise<SupplierPixKeyDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.supplierPixKeyRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.supplierPixKeyRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
