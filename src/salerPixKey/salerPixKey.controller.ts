import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalerPixKeyService } from './salerPixKey.service';
import { SalerPixKeyDto } from './dto/salerPixKey.dto';
import { SalerPixKeyPartialDto } from './dto/salerPixKeyPartial.dto';

@ApiTags('saler_pix_key')
@Controller('saler_pix_key')
export class SalerPixKeyController {
    constructor(private readonly salerPixKeyService: SalerPixKeyService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: SalerPixKeyDto) {
        const newRecord = await this.salerPixKeyService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.salerPixKeyService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.salerPixKeyService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/saler/:id')
    async findAllBySaler(@Res() response, @Param('id') id) {
        const data = await this.salerPixKeyService.findAllBySaler(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: SalerPixKeyPartialDto, @Param('id') id): Promise<SalerPixKeyDto> {
        const oldData = await this.salerPixKeyService.findOne(id);
        return await this.salerPixKeyService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.salerPixKeyService.delete(id);
    }
}
