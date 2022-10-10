import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalerService } from './saler.service';
import { SalerDto } from './dto/saler.dto';
import { SalerPartialDto } from './dto/salerPartial.dto';

@ApiTags('saler')
@Controller('saler')
export class SalerController {
    constructor(private readonly salerService: SalerService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: SalerDto) {
        const newRecord = await this.salerService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.salerService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.salerService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: SalerPartialDto, @Param('id') id): Promise<SalerDto> {
        const oldData = await this.salerService.findOne(id);
        return await this.salerService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.salerService.delete(id);
    }
}
