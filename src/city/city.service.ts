import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CityDto } from './dto/city.dto';
import { CityPartialDto } from './dto/cityPartial.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
    constructor(
        @Inject('CITY_REPOSITORY')
        private cityRepository: Repository<City>,
    ) {}

    async findAll(): Promise<CityDto[]> {
        try {
            return this.cityRepository.find({
                loadRelationIds: true,
                relations: [
                    'idstate'
                ],
                select: {
                    id: true,
                    name: true,
                    active: true,
                    idcompany: true
                }
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<CityDto> {
        try {
            return await this.cityRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: true,
                relations: [
                    'idstate'
                ],
                select: {
                    id: true,
                    name: true,
                    active: true,
                    idcompany: true
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: CityDto): Promise<CityDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.cityRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: CityDto, newValues: CityPartialDto): Promise<CityDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.cityRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.cityRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
