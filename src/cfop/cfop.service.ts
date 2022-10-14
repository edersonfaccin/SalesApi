import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CfopDto } from './dto/cfop.dto';
import { CfopPartialDto } from './dto/cfopPartial.dto';
import { Cfop } from './entities/cfop.entity';

@Injectable()
export class CfopService {
    constructor(
        @Inject('CFOP_REPOSITORY')
        private cfopRepository: Repository<Cfop>,
    ) {}

    async findAll(): Promise<CfopDto[]> {
        try {
            return this.cfopRepository.find({});
        } catch (error) {
            return error;
        }
    }

    async findAllByCompany(idcompany: string): Promise<CfopDto[]> {
        try {
            let query = this.cfopRepository.createQueryBuilder('company')
            query.where(`company.idcompany = '${idcompany}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CfopDto> {
        try {
            return await this.cfopRepository.findOne({ 
                where: { 
                    id: id 
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: CfopDto): Promise<CfopDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.cfopRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CfopDto, newValues: CfopPartialDto): Promise<CfopDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.cfopRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.cfopRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
