import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { ColorDto } from './dto/color.dto';
import { ColorPartialDto } from './dto/colorPartial.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorService {
    constructor(
        @Inject('COLOR_REPOSITORY')
        private colorRepository: Repository<Color>,
    ) {}

    async findAll(): Promise<ColorDto[]> {
        try {
            return this.colorRepository.find({});
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<ColorDto> {
        try {
            return await this.colorRepository.findOne({ 
                where: { 
                    id: id 
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: ColorDto): Promise<ColorDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.colorRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: ColorDto, newValues: ColorPartialDto): Promise<ColorDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.colorRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.colorRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
