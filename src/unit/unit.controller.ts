import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UnitService } from './unit.service';
import { UnitDto } from './dto/unit.dto';
import { UnitPartialDto } from './dto/unitPartial.dto';

@ApiTags('unit')
@Controller('unit')
export class UnitController {
    constructor(private readonly unitService: UnitService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: UnitDto) {
        const newRecord = await this.unitService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.unitService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.unitService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: UnitPartialDto, @Param('id') id): Promise<UnitDto> {
        const oldData = await this.unitService.findOne(id);
        return await this.unitService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.unitService.delete(id);
    }
}
