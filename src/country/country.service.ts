import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CountryDto } from './dto/country.dto';
import { CountryPartialDto } from './dto/countryPartial.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
    constructor(
        @Inject('COUNTRY_REPOSITORY')
        private countryRepository: Repository<Country>,
    ) {}

    async findAll(): Promise<CountryDto[]> {
        try {
            return this.countryRepository.find({
                loadRelationIds: true,
                relations: [
                    'idcompany'
                ],
                select: {
                    id: true,
                    name: true
                }
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CountryDto> {
        try {
            return await this.countryRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: true,
                relations: [
                    'idcompany'
                ],
                select: {
                    id: true,
                    name: true
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: CountryDto): Promise<CountryDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.countryRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CountryDto, newValues: CountryPartialDto): Promise<CountryDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.countryRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.countryRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
