import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { UnitDto } from './dto/unit.dto';
import { UnitPartialDto } from './dto/unitPartial.dto';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
    constructor(
        @Inject('UNIT_REPOSITORY')
        private companyRepository: Repository<Unit>,
    ) {}

    async findAll(): Promise<UnitDto[]> {
        try {
            return this.companyRepository.find({});
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<UnitDto> {
        try {
            return await this.companyRepository.findOne({ 
                where: { 
                    id: id 
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: UnitDto): Promise<UnitDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.companyRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: UnitDto, newValues: UnitPartialDto): Promise<UnitDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.companyRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.companyRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
