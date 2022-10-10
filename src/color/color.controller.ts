import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { ColorDto } from './dto/color.dto';
import { ColorPartialDto } from './dto/colorPartial.dto';

@ApiTags('color')
@Controller('color')
export class ColorController {
    constructor(private readonly colorService: ColorService){}

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Res() response, @Body()record: ColorDto) {
        const newRecord = await this.colorService.create(record);
        return response.status(HttpStatus.CREATED).json(newRecord)
    }

    //@UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const list = await this.colorService.findAll();
        return response.status(HttpStatus.OK).json(list)
    }

    //@UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const data = await this.colorService.findOne(id)
        return response.status(HttpStatus.OK).json(data)
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updatedData: ColorPartialDto, @Param('id') id): Promise<ColorDto> {
        const oldData = await this.colorService.findOne(id);
        return await this.colorService.update(oldData, updatedData);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id) {
        return await this.colorService.delete(id);
    }
}
