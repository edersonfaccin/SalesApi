import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { IcmsTableDto } from './dto/icmsTable.dto';
import { IcmsTablePartialDto } from './dto/icmsTablePartial.dto';
import { IcmsTable } from './entities/icmsTable.entity';

@Injectable()
export class IcmsTableService {
    constructor(
        @Inject('ICMS_TABLE_REPOSITORY')
        private icmsTableRepository: Repository<IcmsTable>,
    ) {}

    async findAll(): Promise<IcmsTableDto[]> {
        try {
            return this.icmsTableRepository.find({
                loadRelationIds: false,
                relations: [
                    'idstate_origin',
                    'idstate_destination'
                ]
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<IcmsTableDto> {
        try {
            return await this.icmsTableRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: false,
                relations: [
                    'idstate_origin',
                    'idstate_destination'
                ]
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: IcmsTableDto): Promise<IcmsTableDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.icmsTableRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: IcmsTableDto, newValues: IcmsTablePartialDto): Promise<IcmsTableDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.icmsTableRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.icmsTableRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
