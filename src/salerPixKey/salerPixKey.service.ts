import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { SalerPixKeyDto } from './dto/salerPixKey.dto';
import { SalerPixKeyPartialDto } from './dto/salerPixKeyPartial.dto';
import { SalerPixKey } from './entities/salerPixKey.entity';

@Injectable()
export class SalerPixKeyService {
    constructor(
        @Inject('SALER_PIX_KEY_REPOSITORY') 
        private salerPixKeyRepository: Repository<SalerPixKey>
    ) {}

    async findAll(): Promise<SalerPixKeyDto[]> {
        try {
            return this.salerPixKeyRepository.find({
                loadRelationIds: false
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<SalerPixKeyDto> {
        try {
            return await this.salerPixKeyRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: false
            })
        } catch (error) {
            return error;
        }
    }

    async findAllBySaler(id: string): Promise<SalerPixKeyDto[]> {
        try {
            let query = this.salerPixKeyRepository.createQueryBuilder('saler_pix_key')
            query.where(`saler_pix_key.idsaler = '${id}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }
    
    async create(data: SalerPixKeyDto): Promise<SalerPixKeyDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.salerPixKeyRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: SalerPixKeyDto, newValues: SalerPixKeyPartialDto): Promise<SalerPixKeyDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.salerPixKeyRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.salerPixKeyRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
