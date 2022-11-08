import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { BankDto } from './dto/bank.dto';
import { BankPartialDto } from './dto/bankPartial.dto';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BankService {
    constructor(
        @Inject('BANK_REPOSITORY')
        private bankRepository: Repository<Bank>,
    ) {}

    async findAll(): Promise<BankDto[]> {
        try {
            return this.bankRepository.find({});
        } catch (error) {
            return error;
        }
    }

    async findAllByCompany(idcompany: string): Promise<BankDto[]> {
        try {
            let query = this.bankRepository.createQueryBuilder('company')
            query.where(`company.idcompany = '${idcompany}'`)

            return query.getMany()
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<BankPartialDto> {
        try {
            return await this.bankRepository.findOne({ 
                where: { 
                    id: id 
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: BankDto): Promise<BankDto> {
        try {
            return this.bankRepository.save(data)
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: BankPartialDto, newValues: BankPartialDto): Promise<BankDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.bankRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.bankRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
