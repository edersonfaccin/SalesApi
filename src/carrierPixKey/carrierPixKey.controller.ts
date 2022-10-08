import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarrierPixKeyService } from './carrierPixKey.service';
import { CarrierPixKeyDto } from './dto/carrierPixKey.dto';
import { CarrierPixKeyPartialDto } from './dto/carrierPixKeyPartial.dto';

@ApiTags('carrier_pix_key')
@Controller('carrier_pix_key')
export class CarrierPixKeyController {
    constructor(private readonly carrierPixKeyService: CarrierPixKeyService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: CarrierPixKeyDto) {
        const newRecord = await this.carrierPixKeyService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.carrierPixKeyService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.carrierPixKeyService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/carrier/:id')
    async findAllByCarrier(@Res() response, @Param('id') id) {
        const data = await this.carrierPixKeyService.findAllByCarrier(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: CarrierPixKeyPartialDto, @Param('id') id): Promise<CarrierPixKeyDto> {
        const oldData = await this.carrierPixKeyService.findOne(id);
        return await this.carrierPixKeyService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.carrierPixKeyService.delete(id);
    }
}
