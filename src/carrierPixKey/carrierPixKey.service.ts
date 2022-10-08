import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CarrierPixKeyDto } from './dto/carrierPixKey.dto';
import { CarrierPixKeyPartialDto } from './dto/carrierPixKeyPartial.dto';
import { CarrierPixKey } from './entities/carrierPixKey.entity';

@Injectable()
export class CarrierPixKeyService {
    constructor(
        @Inject('CARRIER_PIX_KEY_REPOSITORY') 
        private carrierPixKeyRepository: Repository<CarrierPixKey>
    ) {}

    async findAll(): Promise<CarrierPixKeyDto[]> {
        try {
            return this.carrierPixKeyRepository.find({
                loadRelationIds: true
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CarrierPixKeyDto> {
        try {
            return await this.carrierPixKeyRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: true
            })
        } catch (error) {
            return error;
        }
    }

    async findAllByCarrier(id: string): Promise<CarrierPixKeyDto[]> {
        try {
            let query = this.carrierPixKeyRepository.createQueryBuilder('carrier_pix_key')
            query.where(`carrier_pix_key.idcarrier = '${id}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }
    
    async create(data: CarrierPixKeyDto): Promise<CarrierPixKeyDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.carrierPixKeyRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CarrierPixKeyDto, newValues: CarrierPixKeyPartialDto): Promise<CarrierPixKeyDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.carrierPixKeyRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.carrierPixKeyRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
