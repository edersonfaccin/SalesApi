import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { StateDto } from './dto/state.dto';
import { StatePartialDto } from './dto/statePartial.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {
    constructor(
        @Inject('STATE_REPOSITORY')
        private stateRepository: Repository<State>,
    ) {}

    async findAll(): Promise<StateDto[]> {
        try {
            return this.stateRepository.find({
                loadRelationIds: true,
                relations: [
                    'idcountry'
                ],
                select: {
                    id: true,
                    name: true,
                    uf: true, 
                    active: true,
                    idcompany: true
                }
            });
        } catch (error) {
            return error;
        }
    }

    async findOne(id: string): Promise<StateDto> {
        try {
            return await this.stateRepository.findOne({ 
                where: { 
                    id: id 
                },
                loadRelationIds: true,
                relations: [
                    'idcountry'
                ],
                select: {
                    id: true,
                    name: true,
                    uf: true, 
                    active: true,
                    idcompany: true
                }
            })
        } catch (error) {
            return error;
        }
    }
    
    async create(data: StateDto): Promise<StateDto> {
        try {
            const errors = await validate(data)
    
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return this.stateRepository.save(data)
            }
        } catch (error) {
            return error;
        }
    }
    
    async update(oldData: StateDto, newValues: StatePartialDto): Promise<StateDto> {
        const updatedData = oldData;

        try {
            Object.keys(newValues).forEach((key) => {
                updatedData[key] = newValues[key];
            });
      
            const errors = await validate(updatedData)
      
            if (errors.length > 0) {
                throw new Error(`Validation failed!`)
            } else {
                return await this.stateRepository.save(updatedData);
            }
        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            return await this.stateRepository.delete(id);
        } catch (error) {
            return error
        }
    }
}
