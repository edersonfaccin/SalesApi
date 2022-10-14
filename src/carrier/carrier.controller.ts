import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarrierService } from './carrier.service';
import { CarrierDto } from './dto/carrier.dto';
import { CarrierPartialDto } from './dto/carrierPartial.dto';

@ApiTags('carrier')
@Controller('carrier')
export class CarrierController {
    constructor(private readonly carrierService: CarrierService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: CarrierDto) {
        const newRecord = await this.carrierService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.carrierService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/idcompany/:id')
    async findByIdCompany(@Res() response, @Param('id') id) {
        const data = await this.carrierService.findAllByCompany(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.carrierService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: CarrierPartialDto, @Param('id') id): Promise<CarrierDto> {
        const oldData = await this.carrierService.findOne(id);
        return await this.carrierService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.carrierService.delete(id);
    }
}
